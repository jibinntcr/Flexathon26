import { NextResponse } from "next/server";
import fs from "fs";
import { verifySession } from "../auth-utils";
import { getDataFilePath } from "@/lib/data-paths";

const CONTACTS_FILE = getDataFilePath("contacts.json");

export interface SavedContact {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  tag?: string;
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

function readContacts(): SavedContact[] {
  try {
    if (!fs.existsSync(CONTACTS_FILE)) {
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading contacts.json:", err);
    return [];
  }
}

function saveContacts(contacts: SavedContact[]) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving contacts.json:", err);
  }
}

// GET: Fetch saved contacts & audience list
export async function GET(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const tagFilter = (searchParams.get("tag") || "").trim().toLowerCase();

    let contacts = readContacts();

    if (q) {
      contacts = contacts.filter(c =>
        c.email.toLowerCase().includes(q) ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.tag && c.tag.toLowerCase().includes(q))
      );
    }

    if (tagFilter && tagFilter !== "all") {
      contacts = contacts.filter(c => (c.tag || "").toLowerCase() === tagFilter);
    }

    // Extract all unique tags
    const allContacts = readContacts();
    const uniqueTags = Array.from(new Set(allContacts.map(c => c.tag).filter(Boolean)));

    return NextResponse.json({
      success: true,
      contacts: contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      total: contacts.length,
      allCount: allContacts.length,
      tags: uniqueTags
    });
  } catch (err: any) {
    console.error("GET /api/admin/contacts error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// POST: Save one or bulk contacts (with deduplication)
export async function POST(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { contacts: incomingList, contact, tag = "General Leads", source = "Admin Import" } = body;

    const itemsToSave: { email: string; name?: string; phone?: string; tag?: string; source?: string }[] = [];

    if (Array.isArray(incomingList)) {
      itemsToSave.push(...incomingList);
    } else if (contact && contact.email) {
      itemsToSave.push(contact);
    }

    if (itemsToSave.length === 0) {
      return NextResponse.json({ success: false, error: "No contact data provided to save." }, { status: 400 });
    }

    const existingContacts = readContacts();
    const contactMap = new Map<string, SavedContact>();

    // Index existing by email
    for (const c of existingContacts) {
      if (c.email) contactMap.set(c.email.toLowerCase(), c);
    }

    let addedCount = 0;
    let updatedCount = 0;
    const nowIso = new Date().toISOString();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const item of itemsToSave) {
      const email = (item.email || "").trim().toLowerCase();
      if (!email || !emailRegex.test(email)) continue;

      const name = item.name ? item.name.trim() : undefined;
      const phone = item.phone ? item.phone.trim() : undefined;
      const contactTag = (item.tag || tag || "General Leads").trim();
      const contactSource = (item.source || source || "Admin Import").trim();

      if (contactMap.has(email)) {
        // Update existing record
        const existing = contactMap.get(email)!;
        existing.name = name || existing.name;
        existing.phone = phone || existing.phone;
        existing.tag = contactTag || existing.tag;
        existing.updatedAt = nowIso;
        updatedCount++;
      } else {
        // Create new contact
        const newContact: SavedContact = {
          id: `ct_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          email,
          name,
          phone,
          tag: contactTag,
          source: contactSource,
          createdAt: nowIso
        };
        contactMap.set(email, newContact);
        addedCount++;
      }
    }

    const updatedList = Array.from(contactMap.values());
    saveContacts(updatedList);

    return NextResponse.json({
      success: true,
      added: addedCount,
      updated: updatedCount,
      totalSaved: updatedList.length,
      message: `Successfully saved ${addedCount} new contacts and updated ${updatedCount} existing contacts.`
    });
  } catch (err: any) {
    console.error("POST /api/admin/contacts error:", err);
    return NextResponse.json({ success: false, error: err?.message || "Failed to save contacts" }, { status: 500 });
  }
}

// DELETE: Remove contact(s)
export async function DELETE(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    if (clearAll) {
      saveContacts([]);
      return NextResponse.json({ success: true, message: "All saved contacts have been cleared." });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "Contact ID is required for deletion." }, { status: 400 });
    }

    const contacts = readContacts();
    const filtered = contacts.filter(c => c.id !== id);

    if (filtered.length === contacts.length) {
      return NextResponse.json({ success: false, error: "Contact not found." }, { status: 404 });
    }

    saveContacts(filtered);
    return NextResponse.json({ success: true, message: "Contact deleted successfully." });
  } catch (err: any) {
    console.error("DELETE /api/admin/contacts error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete contact" }, { status: 500 });
  }
}

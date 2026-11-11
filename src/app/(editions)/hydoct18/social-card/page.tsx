"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface RunnerProfile {
  id: number;
  registrationId: string;
  name: string;
  category: string;
  photoUrl: string | null;
  cityOrg: string;
  whatsappMasked: string;
  emailMasked: string;
  createdAt: string | null;
  gender?: string | null;
  tshirtSize?: string | null;
}

function SocialCardPageContent() {
  const searchParams = useSearchParams();
  const initialUrlPhone = searchParams?.get("phone") || searchParams?.get("whatsapp") || "";
  const initialUrlName = searchParams?.get("name") || "";
  const initialUrlCategory = searchParams?.get("category") || "10K";
  const initialUrlCity = searchParams?.get("city") || "FLEXATHON RUNNER";

  // Mobile search state
  const [phoneNumber, setPhoneNumber] = useState<string>(initialUrlPhone);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<RunnerProfile[] | null>(null);
  const [searchError, setSearchError] = useState<string>("");
  const [selectedRunnerId, setSelectedRunnerId] = useState<number | null>(null);

  // Card customization state
  const [name, setName] = useState<string>(initialUrlName || "RUNNER NAME");
  const [category, setCategory] = useState<string>(initialUrlCategory || "10K");
  const [cityOrg, setCityOrg] = useState<string>(initialUrlCity || "FLEXATHON RUNNER");
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [usePhoto, setUsePhoto] = useState<boolean>(false);
  const [activeRegBadge, setActiveRegBadge] = useState<string | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Sharing & Feedback state
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);
  const [imageCopied, setImageCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Automatically search if phone is provided in URL
  useEffect(() => {
    if (initialUrlPhone.trim()) {
      handleSearchPhone(initialUrlPhone.trim());
    }
  }, [initialUrlPhone]);

  // Close mobile menu on Esc key or resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle phone lookup
  const handleSearchPhone = async (phoneToSearch?: string) => {
    const raw = (phoneToSearch !== undefined ? phoneToSearch : phoneNumber).trim();
    if (!raw) {
      setSearchError("Please enter your registered mobile number.");
      return;
    }

    const digits = raw.replace(/\D/g, "");
    if (digits.length < 7) {
      setSearchError("Please enter a valid mobile number (at least 7 to 10 digits).");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setSearchResults(null);

    try {
      const res = await fetch(`/api/runner-card?phone=${encodeURIComponent(digits)}`);
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.runners) && data.runners.length > 0) {
        setSearchResults(data.runners);
        // Automatically load the first runner
        loadRunnerData(data.runners[0]);
      } else {
        setSearchResults([]);
        setSearchError(
          data.message || "No registration found with this mobile number. You can enter your details manually below."
        );
      }
    } catch (err: any) {
      console.error("Phone search error:", err);
      setSearchError("Could not verify mobile number. Please check your connection or customize manually.");
    } finally {
      setIsSearching(false);
    }
  };

  // Load a runner's details into the card generator
  const loadRunnerData = (runner: RunnerProfile) => {
    setSelectedRunnerId(runner.id);
    setName(runner.name || "RUNNER");
    setCategory(runner.category || "10K");
    setCityOrg(runner.cityOrg || "FLEXATHON RUNNER");
    setActiveRegBadge(runner.registrationId || null);

    if (runner.photoUrl) {
      setCustomPhoto(runner.photoUrl);
      setUsePhoto(true);
    } else {
      setCustomPhoto(null);
      setUsePhoto(false);
    }

    // Smooth scroll down to card studio on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const studioElem = document.getElementById("card-studio");
      if (studioElem) {
        studioElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
          setUsePhoto(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 1254x1254 Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 1254;
    canvas.width = size;
    canvas.height = size;

    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous";
    templateImg.onload = () => {
      drawCanvasContent(templateImg);
    };
    templateImg.onerror = () => {
      drawCanvasContent();
    };
    templateImg.src = "/assets/social-cards/card-template-base.png";

    function drawCanvasContent(baseImg?: HTMLImageElement) {
      if (!ctx) return;

      if (baseImg && baseImg.complete && baseImg.naturalWidth !== 0) {
        // 1. Draw Master Template Image as crisp 1254x1254px background
        ctx.drawImage(baseImg, 0, 0, size, size);

        // 2. Avatar Circle Coordinates on 1254x1254 scale
        const avatarX = 627;
        const avatarY = 665;
        const avatarRadius = 170;

        if (usePhoto && customPhoto) {
          const userImg = new Image();
          userImg.crossOrigin = "anonymous";
          userImg.onload = () => {
            if (!ctx) return;
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
            ctx.clip();

            const aspect = userImg.naturalWidth / userImg.naturalHeight;
            let dw = avatarRadius * 2;
            let dh = avatarRadius * 2;
            let dx = avatarX - avatarRadius;
            let dy = avatarY - avatarRadius;

            if (aspect > 1) {
              dw = avatarRadius * 2 * aspect;
              dx = avatarX - dw / 2;
            } else {
              dh = (avatarRadius * 2) / aspect;
              dy = avatarY - dh / 2;
            }
            ctx.drawImage(userImg, dx, dy, dw, dh);
            ctx.restore();

            // Redraw inner ring borders
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
            ctx.strokeStyle = "#0F172A";
            ctx.lineWidth = 6;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarRadius + 4, 0, Math.PI * 2);
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 4;
            ctx.stroke();

            renderTextOverlays();
          };
          userImg.onerror = () => {
            renderTextOverlays();
          };
          userImg.src = customPhoto;
        } else {
          // If name initial letter is different from 'D', update letter inside inner circle
          const firstLetter = name.trim() ? name.trim().charAt(0).toUpperCase() : "D";
          if (firstLetter !== "D") {
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarRadius - 2, 0, Math.PI * 2);
            ctx.fillStyle = "#0B192C";
            ctx.fill();

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "900 135px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(firstLetter, avatarX, avatarY);
            ctx.restore();
          }
          renderTextOverlays();
        }
      } else {
        // Fallback procedural canvas
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, size, size);
        renderTextOverlays();
      }

      function renderTextOverlays() {
        if (!ctx) return;

        // 3. Clear ONLY the centered text region (X = 325 to 929)
        const clearX = 325;
        const clearWidth = 604;

        ctx.fillStyle = "#F5F7FB";
        ctx.fillRect(clearX, 875, clearWidth, 80);

        ctx.fillStyle = "#0F172A";
        ctx.font = "900 60px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillText((name || "PARTICIPANT").toUpperCase(), size / 2, 935);

        // 4. Category Badge Pill Area Clearing & Redraw
        const catStr = category.trim().toUpperCase();
        let pillImgSrc = "/assets/social-cards/5k participant.png";
        if (catStr.includes("3K") || catStr === "3") {
          pillImgSrc = "/assets/social-cards/3k participant.png";
        } else if (catStr.includes("10K") || catStr === "10") {
          pillImgSrc = "/assets/social-cards/10K paeticipant.png";
        }

        const pillImg = new Image();
        pillImg.crossOrigin = "anonymous";
        pillImg.onload = () => {
          if (!ctx) return;
          const pw = 420;
          const ph = 70;
          ctx.drawImage(pillImg, size / 2 - pw / 2, 965, pw, ph);
          drawFooterInfo();
        };
        pillImg.onerror = () => {
          const displayCategory = catStr.includes("PARTICIPANT") ? catStr : `${catStr} PARTICIPANT`;
          ctx.font = "800 25px 'Inter', sans-serif";
          const textWidth = ctx.measureText(displayCategory).width;
          const pillWidth = Math.max(textWidth + 54, 290);
          const pillHeight = 56;
          const pillX = size / 2 - pillWidth / 2;
          const pillY = 970;

          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 28);
          ctx.fillStyle = "#10B981";
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(displayCategory, size / 2, pillY + 37);
          drawFooterInfo();
        };
        pillImg.src = pillImgSrc;

        function drawFooterInfo() {
          if (!ctx) return;
          // 5. Subtitle & Website URL Area
          ctx.fillStyle = "#64748B";
          ctx.font = "700 17px 'Inter', sans-serif";
          const subTitleText = (cityOrg.trim() || "FLEXATHON RUNNER").toUpperCase();
          ctx.fillText(subTitleText, size / 2, 1060);

          // 6. Prominent Website URL Overlay
          ctx.fillStyle = "#10B981";
          ctx.font = "800 23px 'Inter', sans-serif";
          ctx.fillText("www.flexathonrun.org", size / 2, 1095);

          // Subtle divider line under URL
          ctx.beginPath();
          ctx.moveTo(size / 2 - 130, 1115);
          ctx.lineTo(size / 2 + 130, 1115);
          ctx.strokeStyle = "#CBD5E1";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }
  }, [name, category, cityOrg, customPhoto, usePhoto]);

  // Download Card as high-res PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      const cleanName = (name.trim() || "Runner").replace(/\s+/g, "_");
      link.download = `Flexathon-2026-${cleanName}-${category}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  // Copy Image directly to Clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (typeof ClipboardItem !== "undefined" && navigator.clipboard && navigator.clipboard.write) {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          setImageCopied(true);
          setTimeout(() => setImageCopied(false), 3000);
        } else {
          handleDownload();
        }
      });
    } catch (e) {
      console.error("Clipboard copy error:", e);
      handleDownload();
    }
  };

  // Caption text (Retrospective / Completed celebration)
  const shareCaption = `Proud finisher at FLEXATHON 2026 Hyderabad! 🏃🏅
Ran for the United Nations Global Goals (SDG 4 Quality Education) at ESCI Gachibowli on 18 October 2026.
Check results & official race archive at: https://flexathonrun.org/hydoct18

#FlexathonRun #GlobalGoalsRun #HyderabadRunners #FitnessForACause #SDG4`;

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(shareCaption);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 3000);
    } catch {
      alert("Caption copied to clipboard!");
    }
  };

  // Native Mobile Web Share
  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      if (navigator.share && navigator.canShare) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], "flexathon-2026-card.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "FLEXATHON 2026 — Runner Card",
              text: shareCaption,
              files: [file]
            });
          } else {
            await navigator.share({
              title: "FLEXATHON 2026 — Runner Card",
              text: shareCaption,
              url: "https://flexathonrun.org"
            });
          }
        });
} else {
        handleDownload();
      }
    } catch (err) {
      console.log("Share cancelled or not supported:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafbfc", color: "#1e293b", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      
      {/* Global Fonts and Layout Utilities */}
      <style jsx global>{`
        .font-condensed {
          font-family: 'Barlow Condensed', 'Montserrat', sans-serif !important;
        }
        .hero-bg-grid {
          background-color: #fafbfc;
          background-image: radial-gradient(#cbd5e1 1.15px, transparent 1.15px);
          background-size: 26px 26px;
        }
        .top-nav-link {
          text-decoration: none;
          color: #1e293b;
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          position: relative;
          padding: 8px 0;
          transition: color 0.2s ease, transform 0.15s ease;
          display: inline-block;
        }
        .top-nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0;
          height: 2.5px;
          background-color: #C5192D;
          border-radius: 2px;
          transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-link:hover, .top-nav-link.active {
          color: #C5192D !important;
          transform: translateY(-1px);
        }
        .top-nav-link:hover::after, .top-nav-link.active::after {
          width: 100%;
        }
        .header-register-btn {
          background-color: #C5192D;
          color: #FFFFFF;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(197, 25, 45, 0.25);
          transition: all 0.2s ease;
          display: inline-block;
        }
        .header-register-btn:hover {
          background-color: #A81324 !important;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(197, 25, 45, 0.38) !important;
        }
        .brand-logo-wrap {
          transition: transform 0.2s ease;
        }
        .brand-logo-wrap:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .page-hero-wrap {
            padding: 32px 18px 40px !important;
          }
        }
      `}</style>

      {/* Identical Header */}
      <Header activePage="social-card" />

      {/* Hero Section */}
      <section className="hero-bg-grid page-hero-wrap" style={{ position: "relative", overflow: "hidden", padding: "48px 32px 36px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <span style={{ backgroundColor: "#0c1e33", color: "#FECDD3", border: "1px solid #C5192D", fontSize: "11px", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "14px" }}>
            HYDERABAD 2026 EDITION ARCHIVE • COMMEMORATIVE RUNNER CARD STUDIO
          </span>
          <h1 className="font-condensed" style={{ fontSize: "clamp(34px, 4.2vw, 56px)", fontWeight: 900, lineHeight: 1.06, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "-1px" }}>
            <span style={{ color: "#0c1e33" }}>CREATE YOUR HYDERABAD 2026 </span>
            <span style={{ color: "#d31b26" }}>COMMEMORATIVE RUNNER CARD</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#475569", fontWeight: 500, lineHeight: 1.6, margin: "0 auto 10px", maxWidth: "740px" }}>
            FLEXATHON 2026 Hyderabad concluded on 18 October 2026. Search your registered phone number or customize your runner name, category, and photo to generate your commemorative 1254×1254 social card.
          </p>
        </div>
      </section>

          {/* STEP 1: MOBILE NUMBER SEARCH BOX */}
          <div style={{
            maxWidth: "620px",
            margin: "24px auto 24px auto",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1.5px solid rgba(242, 198, 109, 0.35)",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)"
          }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#F2C66D", marginBottom: "8px", textAlign: "left" }}>
              📱 Enter Your Registered Mobile / WhatsApp Number
            </label>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchPhone();
              }}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              <div style={{ position: "relative", flex: 1, minWidth: "220px", display: "flex", alignItems: "center" }}>
                <span style={{
                  position: "absolute",
                  left: "14px",
                  color: "#64748B",
                  fontSize: "14px",
                  fontWeight: 700,
                  pointerEvents: "none"
                }}>
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (searchError) setSearchError("");
                  }}
                  placeholder="e.g. 9876543210"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 50px",
                    backgroundColor: "#0A0F1A",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 600,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                style={{
                  padding: "12px 22px",
                  background: "linear-gradient(135deg, #FFF099 0%, #F2C66D 40%, #D4AF37 100%)",
                  color: "#080C14",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: isSearching ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 15px rgba(242, 198, 109, 0.35)",
                  whiteSpace: "nowrap"
                }}
              >
                {isSearching ? (
                  <>
                    <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>🔄</span> Searching...
                  </>
                ) : (
                  <>🔍 Find My Card</>
                )}
              </button>
            </form>

            {/* Search Feedback Messages */}
            {searchError && (
              <div style={{
                marginTop: "12px",
                padding: "10px 14px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                color: "#FCA5A5",
                fontSize: "12.5px",
                textAlign: "left"
              }}>
                ⚠️ {searchError}
              </div>
            )}

            {/* Found Runner Cards List (Supports Multiple Registrations per Phone) */}
            {searchResults && searchResults.length > 0 && (
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  gap: "6px"
                }}>
                  <div style={{ fontSize: "13px", color: "#10B981", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>✓</span> Found {searchResults.length} Runner Registration{searchResults.length === 1 ? "" : "s"}
                  </div>
                  {searchResults.length > 1 && (
                    <span style={{ fontSize: "11px", color: "#F2C66D", fontWeight: 700, backgroundColor: "rgba(242, 198, 109, 0.12)", padding: "3px 8px", borderRadius: "6px" }}>
                      Select a runner below to switch card
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {searchResults.map((runner, idx) => {
                    const isSelected = selectedRunnerId === runner.id;
                    return (
                      <div
                        key={runner.id || idx}
                        onClick={() => loadRunnerData(runner)}
                        style={{
                          padding: "14px 16px",
                          backgroundColor: isSelected ? "rgba(242, 198, 109, 0.14)" : "rgba(255, 255, 255, 0.04)",
                          border: isSelected ? "2px solid #F2C66D" : "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow: isSelected ? "0 4px 20px rgba(242, 198, 109, 0.2)" : "none"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            backgroundColor: isSelected ? "#F2C66D" : "#0B192C",
                            border: `2px solid ${isSelected ? "#FFFFFF" : "#F2C66D"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            fontWeight: 800,
                            color: isSelected ? "#080C14" : "#F2C66D",
                            flexShrink: 0
                          }}>
                            {runner.name ? runner.name.charAt(0).toUpperCase() : "R"}
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              <span style={{ fontWeight: 800, fontSize: "15px", color: isSelected ? "#F2C66D" : "#FFFFFF" }}>
                                {runner.name}
                              </span>
                              <span style={{
                                fontSize: "11px",
                                fontWeight: 800,
                                padding: "2px 6px",
                                backgroundColor: isSelected ? "rgba(242, 198, 109, 0.25)" : "rgba(255, 255, 255, 0.1)",
                                color: isSelected ? "#FFFFFF" : "#F2C66D",
                                borderRadius: "4px"
                              }}>
                                {runner.category} Run
                              </span>
                            </div>
                            <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "3px" }}>
                              <strong style={{ color: "#E2E8F0" }}>{runner.registrationId}</strong>
                              {runner.tshirtSize && ` • Size: ${runner.tshirtSize}`}
                              {runner.cityOrg && ` • ${runner.cityOrg}`}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            type="button"
                            style={{
                              padding: "7px 14px",
                              backgroundColor: isSelected ? "#F2C66D" : "rgba(255, 255, 255, 0.08)",
                              color: isSelected ? "#080C14" : "#FFFFFF",
                              border: isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 800,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              transition: "all 0.15s"
                            }}
                          >
                            {isSelected ? "Active ✓" : "Generate Card →"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

      {/* STEP 2: CARD STUDIO CONTAINER */}
      <section id="card-studio" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(12px, 3vw, 20px) 80px clamp(12px, 3vw, 20px)", boxSizing: "border-box" }}>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "clamp(20px, 3vw, 36px)",
          alignItems: "start"
        }}>

          {/* LEFT: LIVE CARD CANVAS & ACTION BUTTONS */}
          <div style={{
            backgroundColor: "#0F172A",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "clamp(16px, 3vw, 24px)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "100%"
          }}>
            {/* Multi-Runner Quick Switcher Pill Bar */}
            {searchResults && searchResults.length > 1 && (
              <div style={{
                width: "100%",
                padding: "8px 12px",
                marginBottom: "14px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(242, 198, 109, 0.2)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflowX: "auto"
              }}>
                <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 700, whiteSpace: "nowrap" }}>
                  Switch Runner:
                </span>
                <div style={{ display: "flex", gap: "6px" }}>
                  {searchResults.map((r) => (
                    <button
                      key={`pill_${r.id}`}
                      onClick={() => loadRunnerData(r)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: selectedRunnerId === r.id ? "1.5px solid #F2C66D" : "1px solid rgba(255, 255, 255, 0.15)",
                        backgroundColor: selectedRunnerId === r.id ? "#F2C66D" : "transparent",
                        color: selectedRunnerId === r.id ? "#080C14" : "#FFFFFF",
                        fontSize: "11px",
                        fontWeight: 800,
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {r.name} ({r.category})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#F2C66D", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>🖼️</span> Live Card Preview (1254 × 1254 px)
              </div>
              {activeRegBadge && (
                <span style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "3px 8px",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "6px",
                  color: "#10B981"
                }}>
                  Verified {activeRegBadge}
                </span>
              )}
            </div>

            {/* Canvas Display */}
            <div style={{
              width: "100%",
              maxWidth: "460px",
              aspectRatio: "1/1",
              borderRadius: "16px",
              overflow: "hidden",
              border: "2px solid rgba(242, 198, 109, 0.3)",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.5)",
              backgroundColor: "#FFFFFF",
              position: "relative"
            }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "contain"
                }}
              />
            </div>

            {/* PRIMARY ACTION BUTTONS */}
            <div style={{ width: "100%", marginTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "linear-gradient(135deg, #FFF099 0%, #F2C66D 40%, #D4AF37 100%)",
                  color: "#080C14",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 900,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 6px 20px rgba(242, 198, 109, 0.4)",
                  transition: "transform 0.15s ease"
                }}
              >
                <span>⬇️</span> Download High-Resolution Card (PNG)
              </button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleCopyImage}
                  style={{
                    padding: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <span>📋</span> {imageCopied ? "Image Copied! ✓" : "Copy Image"}
                </button>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  style={{
                    padding: "12px",
                    backgroundColor: "#2563EB",
                    border: "none",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <span>📱</span> Share Card
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: CARD CUSTOMIZATION & SOCIAL POSTING STUDIO */}
          <div style={{
            backgroundColor: "#0F172A",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "clamp(16px, 3vw, 28px)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "100%"
          }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px 0", color: "#FFFFFF" }}>
                Customize Your Card
              </h2>
              <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0 }}>
                Adjust your runner details, photo, and race category.
              </p>
            </div>

            {/* RUNNER NAME INPUT */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#F2C66D", marginBottom: "6px" }}>
                RUNNER NAME *
              </label>
              <input
                type="text"
                value={name}
                maxLength={24}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                placeholder="e.g. DHANILDAS"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  backgroundColor: "#0A0F1A",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 700,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>
                Appears prominently in bold uppercase across the center of your card.
              </div>
            </div>

            {/* RACE CATEGORY PILLS */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#F2C66D", marginBottom: "8px" }}>
                RACE CATEGORY *
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { key: "3K", label: "3K Fun Run", color: "#10B981" },
                  { key: "5K", label: "5K Run", color: "#3B82F6" },
                  { key: "10K", label: "10K Challenge", color: "#F59E0B" },
                ].map((catItem) => {
                  const isSelected = category === catItem.key || (catItem.key === "10K" && category.includes("10"));
                  return (
                    <button
                      key={catItem.key}
                      type="button"
                      onClick={() => setCategory(catItem.key)}
                      style={{
                        padding: "12px 8px",
                        backgroundColor: isSelected ? "rgba(242, 198, 109, 0.15)" : "rgba(255, 255, 255, 0.04)",
                        border: isSelected ? "2px solid #F2C66D" : "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "10px",
                        color: isSelected ? "#F2C66D" : "#94A3B8",
                        fontSize: "13px",
                        fontWeight: 800,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "center"
                      }}
                    >
                      {catItem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUBTITLE / CITY / ORGANIZATION */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#F2C66D", marginBottom: "6px" }}>
                RUNNER SUBTITLE / AFFILIATION
              </label>
              <input
                type="text"
                value={cityOrg}
                maxLength={30}
                onChange={(e) => setCityOrg(e.target.value.toUpperCase())}
                placeholder="e.g. FLEXATHON RUNNER, HYDERABAD RUNNERS, TCS RUNNERS"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  backgroundColor: "#0A0F1A",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 600,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            {/* RUNNER PHOTO UPLOAD */}
            <div style={{
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#F2C66D", margin: 0 }}>
                  📸 RUNNER PHOTO (OPTIONAL)
                </label>
                {customPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomPhoto(null);
                      setUsePhoto(false);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#EF4444",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "rgba(242, 198, 109, 0.1)",
                    border: "1px solid rgba(242, 198, 109, 0.3)",
                    borderRadius: "8px",
                    color: "#F2C66D",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>📷</span> {customPhoto ? "Change Photo" : "Upload Your Photo"}
                </button>

                {customPhoto && (
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#94A3B8", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={usePhoto}
                      onChange={(e) => setUsePhoto(e.target.checked)}
                      style={{ accentColor: "#F2C66D" }}
                    />
                    Display on Card
                  </label>
                )}
              </div>
            </div>

            {/* INSTANT SOCIAL SHARING CAPTION BOX */}
            <div style={{
              padding: "16px",
              backgroundColor: "rgba(10, 15, 26, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#F2C66D" }}>
                  📝 Suggested Social Media Caption
                </span>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: copiedCaption ? "#10B981" : "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  {copiedCaption ? "Copied! ✓" : "Copy Caption"}
                </button>
              </div>

              <div style={{
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#94A3B8",
                lineHeight: "1.6",
                whiteSpace: "pre-line",
                fontFamily: "monospace"
              }}>
                {shareCaption}
              </div>

              {/* QUICK SHARE DIRECT ICONS */}
              <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareCaption)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#25D366",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>💬</span> Share on WhatsApp
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareCaption)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#1DA1F2",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>🐦</span> Tweet on X
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 14px",
                    background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>📸</span> Open Instagram
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* UNIFIED FOOTER & PARTNER STRIP */}
      <Footer showPartnerStrip={true} />

      {/* KEYFRAME ANIMATIONS & RESPONSIVE STYLES */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .nav-links-desktop {
          display: none;
        }
        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function SocialCardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#080C14", color: "#F2C66D", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Social Card Studio...</div>}>
      <SocialCardPageContent />
    </Suspense>
  );
}

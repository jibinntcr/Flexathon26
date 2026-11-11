"use client";

import React, { useState, useEffect, useRef } from "react";

interface SocialCardGeneratorProps {
  initialName?: string;
  initialCategory?: string;
  initialPhotoUrl?: string;
  initialCityOrg?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export default function SocialCardGenerator({
  initialName = "DHANILDAS",
  initialCategory = "10K",
  initialPhotoUrl = "",
  initialCityOrg = "FLEXATHON RUNNER",
  onClose,
  isModal = false,
}: SocialCardGeneratorProps) {
  const [name, setName] = useState(initialName || "DHANILDAS");
  const [category, setCategory] = useState(initialCategory || "10K");
  const [cityOrg, setCityOrg] = useState(initialCityOrg || "FLEXATHON RUNNER");
  const [customPhoto, setCustomPhoto] = useState<string | null>(initialPhotoUrl || null);
  const [usePhoto, setUsePhoto] = useState<boolean>(Boolean(initialPhotoUrl));
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle custom photo upload
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

  // Render card to HTML5 Canvas (1254 x 1254 pixels matching cardAssets master template)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 1254;
    canvas.width = size;
    canvas.height = size;

    // Load master template base background image (cardAssets master template)
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

        // If user provided a photo and toggle is enabled
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
        // Fallback procedural canvas drawing if image loading
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, size, size);
        renderTextOverlays();
      }

      function renderTextOverlays() {
        if (!ctx) return;

        // 3. Clear ONLY the centered text region (X = 320 to 934) so it NEVER cuts into the bottom-right SDG wheel!
        const clearX = 325;
        const clearWidth = 604; // Ends cleanly at X = 929, well before SDG wheel at X = 970

        // Name Area Clearing & Redraw
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
          // Draw official pill image centered at Y=965
          const pw = 420;
          const ph = 70;
          ctx.drawImage(pillImg, size / 2 - pw / 2, 965, pw, ph);
          drawFooterInfo();
        };
        pillImg.onerror = () => {
          // Fallback procedural pill
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

  // Copy Card Image directly to Clipboard for Ctrl+V / Cmd+V
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
          setTimeout(() => setImageCopied(false), 3500);
        } else {
          handleDownload();
        }
      });
    } catch (e) {
      console.error("Clipboard image copy error:", e);
      handleDownload();
    }
  };

  // Download Card as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `Flexathon-2026-${name.trim().replace(/\s+/g, "_") || "Card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Caption text
  const shareCaption = `I'm participating in #Flexathon2026! 🏃
Running for a Global Goal. 🌍
Let's build a better world together. 💚
Join me: https://www.flexathonrun.org/`;

  // Copy Caption to Clipboard
  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(shareCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert("Caption copied to clipboard!");
    }
  };

  // Web Share API on Mobile / Direct Social Share
  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      if (navigator.share && navigator.canShare) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], "flexathon-card.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "FLEXATHON 2026 Participant Card",
              text: shareCaption,
              files: [file],
            });
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 3000);
            return;
          }
        });
        return;
      }
    } catch (e) {
      console.log("Native share cancelled or unsupported", e);
    }
    handleDownload();
    handleCopyCaption();
  };

  const encodedCaption = encodeURIComponent(shareCaption);

  const containerContent = (
    <div style={{ maxWidth: "1050px", margin: "0 auto", color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <span style={{ 
          display: "inline-block", padding: "6px 16px", backgroundColor: "rgba(16,185,129,0.15)", 
          border: "1px solid rgba(16,185,129,0.3)", borderRadius: "20px", color: "#10B981", 
          fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px"
        }}>
          Step 2 of 2: Create & Share
        </span>
        <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#FFFFFF", margin: "0 0 6px 0" }}>
          Flexathon Participant Social Share Card
        </h2>
        <p style={{ fontSize: "15px", color: "#94A3B8", margin: 0 }}>
          Personalise your official runner card with your name and category, download, and share with your network!
        </p>
      </div>

      {/* Main Grid: Controls vs Card Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", alignItems: "start" }}>
        {/* Left Column: Personalization Controls */}
        <div style={{ 
          backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255, 255, 255, 0.12)", 
          borderRadius: "16px", padding: "24px", backdropFilter: "blur(10px)" 
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#F2C66D", marginTop: 0, marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            Personalise Runner Details
          </h3>

          {/* Photo Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#94A3B8", marginBottom: "8px", textTransform: "uppercase" }}>
              Participant Photo
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ 
                width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#1E293B", 
                border: "2px solid #2563EB", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                {usePhoto && customPhoto ? (
                  <img src={customPhoto} alt="Runner Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF" }}>{name.charAt(0) || "D"}</span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: "8px 14px", backgroundColor: "#2563EB", border: "none", borderRadius: "8px",
                      color: "#FFFFFF", fontSize: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                    }}
                  >
                    📷 Upload Photo
                  </button>
                  {usePhoto && (
                    <button
                      type="button"
                      onClick={() => setUsePhoto(false)}
                      style={{
                        padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px", color: "#94A3B8", fontSize: "12px", fontWeight: 600, cursor: "pointer"
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />
                <div style={{ fontSize: "11px", color: "#64748B" }}>JPG, PNG or WEBP recommended</div>
              </div>
            </div>
          </div>

          {/* Participant Name Input */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>
              Participant Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. DHANILDAS"
              style={{
                width: "100%", padding: "10px 14px", backgroundColor: "#080C12", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px", color: "#FFFFFF", fontSize: "14px", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          {/* Automatically Selected Race Category Badge */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#94A3B8", marginBottom: "8px", textTransform: "uppercase" }}>
              Race Category
            </label>
            <div style={{ 
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px", backgroundColor: "#080C12", border: "1px solid rgba(16, 185, 129, 0.35)", 
              borderRadius: "8px" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }}></span>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF" }}>
                  {category.toUpperCase().includes("PARTICIPANT") ? category.toUpperCase() : `${category.toUpperCase()} PARTICIPANT`}
                </span>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Automatically Assigned
              </span>
            </div>
          </div>

          {/* Subtitle (Optional) */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#94A3B8", marginBottom: "6px", textTransform: "uppercase" }}>
              Subtitle / Organisation (Optional)
            </label>
            <input
              type="text"
              value={cityOrg}
              onChange={(e) => setCityOrg(e.target.value)}
              placeholder="e.g. FLEXATHON RUNNER"
              style={{
                width: "100%", padding: "10px 14px", backgroundColor: "#080C12", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px", color: "#FFFFFF", fontSize: "14px", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
        </div>

        {/* Right Column: Card Live Preview & Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Card Preview Container */}
          <div style={{
            width: "100%", maxWidth: "440px", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)", border: "2px solid rgba(242, 198, 109, 0.3)",
            backgroundColor: "#000000"
          }}>
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>

          {/* Action Buttons Box */}
          <div style={{ 
            width: "100%", maxWidth: "440px", marginTop: "20px",
            backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "16px", padding: "20px", boxSizing: "border-box"
          }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#10B981", textAlign: "center", marginBottom: "14px" }}>
              ✓ Your Flexathon Card is Ready!
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                onClick={handleDownload}
                style={{
                  width: "100%", padding: "14px", backgroundColor: "#10B981", border: "none", borderRadius: "10px",
                  color: "#FFFFFF", fontSize: "15px", fontWeight: 800, cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s"
                }}
              >
                <span>⬇️</span> Download Card (PNG)
              </button>

              <button
                type="button"
                onClick={handleCopyImage}
                style={{
                  width: "100%", padding: "12px", backgroundColor: imageCopied ? "#059669" : "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)", borderRadius: "10px", color: "#FFFFFF",
                  fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s"
                }}
              >
                <span>🖼️</span> {imageCopied ? "✓ Card Image Copied! (Press Ctrl+V to paste)" : "Copy Card Image (Ctrl+V / Cmd+V)"}
              </button>

              <button
                type="button"
                onClick={handleCopyCaption}
                style={{
                  width: "100%", padding: "12px", backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "#FFFFFF",
                  fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s"
                }}
              >
                <span>📋</span> {copied ? "✓ Caption Copied!" : "Copy Post Caption"}
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                style={{
                  width: "100%", padding: "12px", backgroundColor: "#2563EB", border: "none", borderRadius: "10px",
                  color: "#FFFFFF", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s"
                }}
              >
                <span>📲</span> {shareSuccess ? "✓ Opened Share Sheet!" : "Share via Mobile App / Web Share"}
              </button>
            </div>

            {/* Direct Social Share Quick Links */}
            <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600, marginBottom: "10px" }}>
                Or share directly on:
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodedCaption}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#25D366",
                    display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#FFF", fontSize: "17px"
                  }}
                  title="Share on WhatsApp"
                >
                  💬
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent("https://www.flexathonrun.org/")}&text=${encodedCaption}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#0088cc",
                    display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#FFF", fontSize: "16px"
                  }}
                  title="Share on Telegram"
                >
                  ✈️
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://www.flexathonrun.org/")}&summary=${encodedCaption}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#0A66C2",
                    display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#FFF", fontSize: "16px", fontWeight: "bold"
                  }}
                  title="Share on LinkedIn"
                >
                  in
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.flexathonrun.org/")}&quote=${encodedCaption}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#1877F2",
                    display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#FFF", fontSize: "16px", fontWeight: "bold"
                  }}
                  title="Share on Facebook"
                >
                  f
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedCaption}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#000000",
                    border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", color: "#FFF", fontSize: "15px", fontWeight: 900
                  }}
                  title="Share on X"
                >
                  𝕏
                </a>

                {/* Instagram (Copy Image & Open Instagram) */}
                <button
                  type="button"
                  onClick={() => {
                    handleCopyImage();
                    window.open("https://www.instagram.com/", "_blank");
                  }}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
                    border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#FFF", fontSize: "17px", cursor: "pointer"
                  }}
                  title="Copy Image & Open Instagram"
                >
                  📸
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return containerContent;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#080C12", padding: "40px 20px" }}>
      {containerContent}
    </div>
  );
}

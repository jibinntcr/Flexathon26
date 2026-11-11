"use client";

import React from "react";
import SocialCardGenerator from "./SocialCardGenerator";

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  runnerName?: string;
  runnerCategory?: string;
  runnerPhotoUrl?: string;
}

export default function SocialShareModal({
  isOpen,
  onClose,
  runnerName,
  runnerCategory,
  runnerPhotoUrl,
}: SocialShareModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(12px)",
        zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", overflowY: "auto"
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: "relative", width: "100%", maxWidth: "1100px", maxHeight: "90vh",
          backgroundColor: "#0B111E", border: "1px solid rgba(242, 198, 109, 0.3)",
          borderRadius: "24px", padding: "30px 24px", overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "20px", right: "24px", width: "40px", height: "40px",
            borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", border: "none",
            color: "#FFFFFF", fontSize: "20px", fontWeight: "bold", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,38,38,0.3)"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
          title="Close Modal"
        >
          ✕
        </button>

        <SocialCardGenerator
          initialName={runnerName}
          initialCategory={runnerCategory}
          initialPhotoUrl={runnerPhotoUrl}
          onClose={onClose}
          isModal={true}
        />
      </div>
    </div>
  );
}

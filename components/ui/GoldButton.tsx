"use client";

import React from "react";
import { GOLD, GOLD_HOVER } from "@/lib/constants";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  large?: boolean;
  outline?: boolean;
  green?: boolean;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function GoldButton({
  children,
  onClick,
  large = false,
  outline = false,
  green = false,
  style: extraStyle = {},
  type = "button",
  disabled = false,
}: GoldButtonProps) {
  const getBg = () => {
    if (outline) return "transparent";
    if (green) return "#25D366";
    return GOLD;
  };

  const getColor = () => {
    if (outline) return green ? "#25D366" : GOLD;
    return "#fff";
  };

  const getBorder = () => {
    if (outline) return `2px solid ${green ? "#25D366" : GOLD}`;
    return "none";
  };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: large ? "18px 44px" : "14px 36px",
    fontSize: large ? 18 : 16,
    fontWeight: 700,
    fontFamily: "var(--font-heebo), Heebo, sans-serif",
    border: getBorder(),
    borderRadius: 50,
    cursor: disabled ? "default" : "pointer",
    background: getBg(),
    color: getColor(),
    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
    letterSpacing: 0.5,
    textDecoration: "none",
    opacity: disabled ? 0.6 : 1,
    ...extraStyle,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.transform = "scale(1.04)";
    if (!outline) {
      e.currentTarget.style.background = green ? "#1da851" : GOLD_HOVER;
    }
    e.currentTarget.style.boxShadow = `0 8px 30px ${
      green ? "rgba(37,211,102,0.3)" : "rgba(184,150,90,0.35)"
    }`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.transform = "scale(1)";
    if (!outline) {
      e.currentTarget.style.background = green ? "#25D366" : GOLD;
    }
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <button
      type={type}
      style={base}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}

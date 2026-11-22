"use client";

import React, { useEffect, useState } from "react";

interface StatusBarProps {
  weatherCondition: string; // e.g. "clear", "rainy", "snowy"
  theme: "day" | "night";
}

export function StatusBar({ weatherCondition, theme }: StatusBarProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTimeStr(formatter.format(new Date()));
      } catch {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        setTimeStr(`${hh}:${mm}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const textColorClass = theme === "day" ? "text-[#121212]" : "text-[#F3F2EE]";

  return (
    <div
      className={`fixed left-8 md:left-14 bottom-8 z-30 pointer-events-none select-none text-xs sm:text-sm font-light tracking-wide transition-colors duration-500 ${textColorClass}`}
    >
      <p>
        <span className="font-medium">Murat Baş</span>
        <span className="opacity-80">
          {" "}— It&apos;s {timeStr || "19:00"} in Samsun, {weatherCondition ? weatherCondition.trim() : "clear"}. Building web products.
        </span>
      </p>
    </div>
  );
}

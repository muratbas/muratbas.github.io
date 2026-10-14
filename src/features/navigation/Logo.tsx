import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <Image
        src="/logo.png"
        alt="murat bas."
        width={930}
        height={127}
        priority
        className="w-72 sm:w-96 md:w-[460px] lg:w-[540px] h-auto object-contain"
      />
    </div>
  );
}

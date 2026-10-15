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
        width={1000}
        height={400}
        priority
        className="w-64 sm:w-80 md:w-[380px] lg:w-[440px] h-auto object-contain"
      />
    </div>
  );
}

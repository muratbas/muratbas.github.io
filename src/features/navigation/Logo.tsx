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
        alt="Logo"
        width={500}
        height={199}
        priority
        className="w-72 sm:w-96 md:w-[420px] lg:w-[480px] h-auto object-contain"
      />
    </div>
  );
}

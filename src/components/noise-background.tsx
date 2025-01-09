"use client";

import React, { useEffect, useState, useRef } from "react";

interface NoiseBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: number;
  size?: number;
  opacity?: number;
  blendMode?: "overlay" | "multiply" | "screen" | "darken" | "lighten";
}

export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  density = 0.5,
  size = 200,
  opacity = 0.2,
  blendMode = "overlay",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  const [encodedNoise, setEncodedNoise] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        if (Math.random() < density) {
          const value = Math.floor(Math.random() * 255);
          ctx.fillStyle = `rgb(${value},${value},${value})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    setEncodedNoise(canvas.toDataURL());
  }, [density, size]);

  useEffect(() => {
    const updateContainerHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${document.documentElement.scrollHeight}px`;
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        containerRef.current.style.transform = `translateY(-${scrollY}px)`;
      }
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    window.addEventListener("load", updateContainerHeight);
    window.addEventListener("scroll", handleScroll);

    const observer = new MutationObserver(updateContainerHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
      window.removeEventListener("load", updateContainerHeight);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${encodedNoise})`,
          backgroundSize: `${size}px ${size}px`,
          opacity: opacity,
          mixBlendMode: blendMode,
        }}
      />
    </div>
  );
};

export default NoiseBackground;

// "use client";

// import React, { useEffect, useState, useRef } from "react";

// interface NoiseBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
//   density?: number;
//   size?: number;
//   opacity?: number;
//   blendMode?: "overlay" | "multiply" | "screen" | "darken" | "lighten";
// }

// export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
//   density = 0.5,
//   size = 200,
//   opacity = 0.2,
//   blendMode = "overlay",
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   ...props
// }) => {
//   const [encodedNoise, setEncodedNoise] = useState<string>("");
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const canvas = document.createElement("canvas");
//     canvas.width = size;
//     canvas.height = size;
//     const ctx = canvas.getContext("2d")!;

//     for (let x = 0; x < canvas.width; x++) {
//       for (let y = 0; y < canvas.height; y++) {
//         if (Math.random() < density) {
//           const value = Math.floor(Math.random() * 255);
//           ctx.fillStyle = `rgb(${value},${value},${value})`;
//           ctx.fillRect(x, y, 1, 1);
//         }
//       }
//     }

//     setEncodedNoise(canvas.toDataURL());
//   }, [density, size]);

//   useEffect(() => {
//     const updateContainerHeight = () => {
//       if (containerRef.current) {
//         containerRef.current.style.height = `${document.documentElement.scrollHeight}px`;
//       }
//     };

//     const handleScroll = () => {
//       if (containerRef.current) {
//         const scrollY = window.scrollY;
//         containerRef.current.style.transform = `translateY(-${scrollY}px)`;
//       }
//     };

//     updateContainerHeight();
//     window.addEventListener("resize", updateContainerHeight);
//     window.addEventListener("load", updateContainerHeight);
//     window.addEventListener("scroll", handleScroll);

//     const observer = new MutationObserver(updateContainerHeight);
//     observer.observe(document.body, { childList: true, subtree: true });

//     return () => {
//       window.removeEventListener("resize", updateContainerHeight);
//       window.removeEventListener("load", updateContainerHeight);
//       window.removeEventListener("scroll", handleScroll);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 pointer-events-none"
//       style={{ willChange: "transform" }}
//     >
//       <div
//         className="w-full h-full"
//         style={{
//           backgroundImage: `url(${encodedNoise})`,
//           backgroundSize: `${size}px ${size}px`,
//           opacity: opacity,
//           mixBlendMode: blendMode,
//         }}
//       />
//     </div>
//   );
// };

// export default NoiseBackground;
"use client";

import React, { useEffect, useState, useCallback } from "react";

interface NoiseBackgroundProps {
  density?: number;
  size?: number;
  opacity?: number;
  blendMode?: "overlay" | "multiply" | "screen" | "darken" | "lighten";
}

const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  density = 0.7,
  size = 256,
  opacity = 0.3,
  blendMode = "overlay",
}) => {
  const [encodedNoise, setEncodedNoise] = useState<string>("");

  const generateImprovedNoise = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    // Improved noise generation using Perlin-like approach
    const noise = new Array(size * size).fill(0);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let value = 0;
        let scale = 1;
        let scaleSum = 0;

        for (let octave = 0; octave < 4; octave++) {
          const pitch = size >> octave;
          const sampleX1 = Math.floor((x / pitch) * pitch);
          const sampleY1 = Math.floor((y / pitch) * pitch);
          const sampleX2 = (sampleX1 + pitch) % size;
          const sampleY2 = (sampleY1 + pitch) % size;

          const blendX = (x - sampleX1) / pitch;
          const blendY = (y - sampleY1) / pitch;

          const sampleT =
            (1 - blendX) * noise[sampleY1 * size + sampleX1] +
            blendX * noise[sampleY1 * size + sampleX2];
          const sampleB =
            (1 - blendX) * noise[sampleY2 * size + sampleX1] +
            blendX * noise[sampleY2 * size + sampleX2];

          value += (blendY * (sampleB - sampleT) + sampleT) * scale;
          scaleSum += scale;
          scale /= 2;
        }

        noise[y * size + x] = value / scaleSum;
      }
    }

    // Apply noise to image data
    for (let i = 0; i < size * size; i++) {
      const noiseValue = Math.min(Math.max(noise[i], 0), 1);
      const pixelValue = Math.floor(noiseValue * 255);
      const index = i * 4;
      data[index] = pixelValue;
      data[index + 1] = pixelValue;
      data[index + 2] = pixelValue;
      data[index + 3] = Math.random() < density ? 255 : 0;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }, [density, size]);

  useEffect(() => {
    setEncodedNoise(generateImprovedNoise());
  }, [generateImprovedNoise]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${encodedNoise})`,
        backgroundSize: `${size}px ${size}px`,
        opacity: opacity,
        mixBlendMode: blendMode,
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
};

export default NoiseBackground;

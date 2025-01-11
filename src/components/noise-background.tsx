// "use client";

// import React, { useEffect, useState, useCallback } from "react";

// // Interface defining the properties for the NoiseBackground component
// interface NoiseBackgroundProps {
//   density?: number; // Determines the density of the noise
//   size?: number; // Size of the noise pattern
//   opacity?: number; // Opacity level of the noise
//   blendMode?: "overlay" | "multiply" | "screen" | "darken" | "lighten"; // CSS blend mode for the noise
// }

// // Functional component for rendering a noise background
// const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
//   density = 0.7, // Default density
//   size = 256, // Default size
//   opacity = 0.3, // Default opacity
//   blendMode = "overlay", // Default blend mode
// }) => {
//   const [encodedNoise, setEncodedNoise] = useState<string>(""); // State to store the encoded noise data

//   // Function to generate improved noise using a Perlin-like approach
//   const generateImprovedNoise = useCallback(() => {
//     const canvas = document.createElement("canvas"); // Create a new canvas element
//     canvas.width = size; // Set canvas width
//     canvas.height = size; // Set canvas height
//     const ctx = canvas.getContext("2d")!; // Get the 2D rendering context

//     const imageData = ctx.createImageData(size, size); // Create a new image data object
//     const data = imageData.data; // Access the pixel data of the image

//     // Initialize an array to store noise values
//     const noise = new Array(size * size).fill(0);
//     for (let y = 0; y < size; y++) {
//       for (let x = 0; x < size; x++) {
//         let value = 0;
//         let scale = 1;
//         let scaleSum = 0;

//         // Generate noise using multiple octaves for a smoother appearance
//         for (let octave = 0; octave < 4; octave++) {
//           const pitch = size >> octave; // Determine the frequency of the noise
//           const sampleX1 = Math.floor((x / pitch) * pitch); // Sample point 1 on X-axis
//           const sampleY1 = Math.floor((y / pitch) * pitch); // Sample point 1 on Y-axis
//           const sampleX2 = (sampleX1 + pitch) % size; // Sample point 2 on X-axis
//           const sampleY2 = (sampleY1 + pitch) % size; // Sample point 2 on Y-axis

//           const blendX = (x - sampleX1) / pitch; // Interpolation factor on X-axis
//           const blendY = (y - sampleY1) / pitch; // Interpolation factor on Y-axis

//           // Interpolate noise values
//           const sampleT =
//             (1 - blendX) * noise[sampleY1 * size + sampleX1] +
//             blendX * noise[sampleY1 * size + sampleX2];
//           const sampleB =
//             (1 - blendX) * noise[sampleY2 * size + sampleX1] +
//             blendX * noise[sampleY2 * size + sampleX2];

//           value += (blendY * (sampleB - sampleT) + sampleT) * scale; // Accumulate noise value
//           scaleSum += scale; // Sum of scales
//           scale /= 2; // Reduce scale for next octave
//         }

//         noise[y * size + x] = value / scaleSum; // Normalize value by scale sum
//       }
//     }

//     // Apply the generated noise to the image data
//     for (let i = 0; i < size * size; i++) {
//       const noiseValue = Math.min(Math.max(noise[i], 0), 1); // Clamp noise value
//       const pixelValue = Math.floor(noiseValue * 255); // Convert to pixel value
//       const index = i * 4; // Calculate pixel index
//       data[index] = pixelValue; // Red channel
//       data[index + 1] = pixelValue; // Green channel
//       data[index + 2] = pixelValue; // Blue channel
//       data[index + 3] = Math.random() < density ? 255 : 0; // Alpha channel
//     }

//     ctx.putImageData(imageData, 0, 0); // Draw the image data onto the canvas
//     return canvas.toDataURL(); // Return the encoded image as a data URL
//   }, [density, size]); // Dependencies for the useCallback hook

//   // Effect to generate and set the noise when the component mounts or dependencies change
//   useEffect(() => {
//     setEncodedNoise(generateImprovedNoise());
//   }, [generateImprovedNoise]); // Dependencies for the useEffect hook

//   // Render a full-screen div with the generated noise as its background
//   return (
//     <div
//       style={{
//         position: "fixed", // Fixed position for full-screen coverage
//         top: 0,
//         left: 0,
//         width: "100%", // Full width
//         height: "100%", // Full height
//         backgroundImage: `url(${encodedNoise})`, // Background image from noise
//         backgroundSize: `${size}px ${size}px`, // Size of the background pattern
//         opacity: opacity, // Opacity of the background
//         mixBlendMode: blendMode, // Blend mode for the background
//         pointerEvents: "none", // Prevent interaction with the background
//         zIndex: 1, // Z-index for stacking order
//       }}
//       aria-hidden="true" // Accessibility attribute to hide from assistive technologies
//     />
//   );
// };

// export default NoiseBackground; // Export the component as default

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

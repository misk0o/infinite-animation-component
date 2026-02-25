"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

// UNIVERSAL DICTIONARY: A-Z and 0-9
// X: Horizontal width | Y: 50 is Top, 100 is Center (Vertical Origin), 150 is Bottom
const FONT_DEF: {
  [key: string]: {
    width: number;
    verticals: { x: number; top?: boolean; bottom?: boolean }[];
    elements: {
      type: "horizontal" | "diagonal";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      delay: number;
    }[];
  };
} = {
  A: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
    ],
  },
  B: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  C: {
    width: 60,
    verticals: [{ x: 0 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.3 },
    ],
  },
  D: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.3 },
    ],
  },
  E: {
    width: 60,
    verticals: [{ x: 0 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 40, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  F: {
    width: 60,
    verticals: [{ x: 0 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 40, y2: 100, delay: 0.3 },
    ],
  },
  G: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60, top: false }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.3 },
      { type: "horizontal", x1: 30, y1: 100, x2: 60, y2: 100, delay: 0.4 },
    ],
  },
  H: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.2 },
    ],
  },
  I: {
    width: 30,
    verticals: [{ x: 15 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 30, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 30, y2: 150, delay: 0.2 },
    ],
  },
  J: {
    width: 60,
    verticals: [{ x: 60 }, { x: 0, top: false }],
    elements: [
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.2 },
    ],
  },
  K: {
    width: 60,
    verticals: [{ x: 0 }],
    elements: [
      { type: "diagonal", x1: 0, y1: 100, x2: 60, y2: 50, delay: 0.2 },
      { type: "diagonal", x1: 0, y1: 100, x2: 60, y2: 150, delay: 0.3 },
    ],
  },
  L: {
    width: 60,
    verticals: [{ x: 0 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.2 },
    ],
  },
  M: {
    width: 80,
    verticals: [{ x: 0 }, { x: 80 }],
    elements: [
      { type: "diagonal", x1: 0, y1: 50, x2: 40, y2: 100, delay: 0.25 },
      { type: "diagonal", x1: 80, y1: 50, x2: 40, y2: 100, delay: 0.25 },
    ],
  },
  N: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "diagonal", x1: 0, y1: 50, x2: 60, y2: 150, delay: 0.3 },
    ],
  },
  O: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.3 },
    ],
  },
  P: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60, bottom: false }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
    ],
  },
  Q: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.3 },
      { type: "diagonal", x1: 30, y1: 120, x2: 60, y2: 180, delay: 0.4 },
    ],
  },
  R: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60, bottom: false }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "diagonal", x1: 0, y1: 100, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  S: {
    width: 60,
    verticals: [
      { x: 0, bottom: false },
      { x: 60, top: false },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  T: {
    width: 60,
    verticals: [{ x: 30 }],
    elements: [
      { type: "horizontal", x1: 30, y1: 50, x2: 0, y2: 50, delay: 0.25 },
      { type: "horizontal", x1: 30, y1: 50, x2: 60, y2: 50, delay: 0.25 },
    ],
  },
  U: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.2 },
    ],
  },
  V: {
    width: 60,
    verticals: [
      { x: 0, bottom: false },
      { x: 60, bottom: false },
    ],
    elements: [
      { type: "diagonal", x1: 0, y1: 100, x2: 30, y2: 150, delay: 0.2 },
      { type: "diagonal", x1: 60, y1: 100, x2: 30, y2: 150, delay: 0.2 },
    ],
  },
  W: {
    width: 80,
    verticals: [{ x: 0 }, { x: 80 }],
    elements: [
      { type: "diagonal", x1: 0, y1: 150, x2: 40, y2: 100, delay: 0.25 },
      { type: "diagonal", x1: 80, y1: 150, x2: 40, y2: 100, delay: 0.25 },
    ],
  },
  X: {
    width: 60,
    verticals: [],
    elements: [
      { type: "diagonal", x1: 30, y1: 100, x2: 0, y2: 50, delay: 0.2 },
      { type: "diagonal", x1: 30, y1: 100, x2: 60, y2: 50, delay: 0.2 },
      { type: "diagonal", x1: 30, y1: 100, x2: 0, y2: 150, delay: 0.2 },
      { type: "diagonal", x1: 30, y1: 100, x2: 60, y2: 150, delay: 0.2 },
    ],
  },
  Y: {
    width: 60,
    verticals: [{ x: 30, top: false }],
    elements: [
      { type: "diagonal", x1: 30, y1: 100, x2: 0, y2: 50, delay: 0.2 },
      { type: "diagonal", x1: 30, y1: 100, x2: 60, y2: 50, delay: 0.2 },
    ],
  },
  Z: {
    width: 60,
    verticals: [
      { x: 0, top: false },
      { x: 60, bottom: false },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.3 },
      { type: "diagonal", x1: 60, y1: 50, x2: 0, y2: 150, delay: 0.4 },
    ],
  },

  // NUMBERS
  0: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.2 },
      { type: "diagonal", x1: 0, y1: 150, x2: 60, y2: 50, delay: 0.3 },
    ],
  },
  1: {
    width: 40,
    verticals: [{ x: 20 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 150, x2: 40, y2: 150, delay: 0.2 },
      { type: "diagonal", x1: 0, y1: 80, x2: 20, y2: 50, delay: 0.3 },
    ],
  },
  2: {
    width: 60,
    verticals: [
      { x: 60, bottom: false },
      { x: 0, top: false },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  3: {
    width: 60,
    verticals: [{ x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  4: {
    width: 60,
    verticals: [
      { x: 0, bottom: false },
      { x: 60 },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.2 },
    ],
  },
  5: {
    width: 60,
    verticals: [
      { x: 0, bottom: false },
      { x: 60, top: false },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  6: {
    width: 60,
    verticals: [
      { x: 0 },
      { x: 60, top: false },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  7: {
    width: 60,
    verticals: [{ x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
    ],
  },
  8: {
    width: 60,
    verticals: [{ x: 0 }, { x: 60 }],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
  9: {
    width: 60,
    verticals: [
      { x: 0, bottom: false },
      { x: 60 },
    ],
    elements: [
      { type: "horizontal", x1: 0, y1: 50, x2: 60, y2: 50, delay: 0.2 },
      { type: "horizontal", x1: 0, y1: 100, x2: 60, y2: 100, delay: 0.3 },
      { type: "horizontal", x1: 0, y1: 150, x2: 60, y2: 150, delay: 0.4 },
    ],
  },
};

interface HaloLoaderProps {
  text?: string;
  onComplete?: () => void;
}

export default function HaloLoader({ text = "EMT", onComplete }: HaloLoaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1. Calculate Layout statelessly
  const { renderData, totalWidth } = useMemo(() => {
    const letterSpacing = 30;
    const padding = 50;
    let currentX = padding;
    const data: {
      char: string;
      id: string;
      def: (typeof FONT_DEF)[string];
      startX: number;
    }[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i]!.toUpperCase();

      if (char === " ") {
        currentX += 40;
        continue;
      }

      const def = FONT_DEF[char];
      if (!def) continue; // Skip unsupported characters

      data.push({ char, id: `${char}-${i}`, def, startX: currentX });
      currentX += def.width + letterSpacing;
    }

    return {
      renderData: data,
      totalWidth: Math.max(100, currentX - letterSpacing + padding * 2),
    };
  }, [text]);

  // 2. Setup Animation
  useEffect(() => {
    const premiumEase = "cubic-bezier(0.77, 0, 0.175, 1)";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      const groups = gsap.utils.toArray<SVGGElement>(".letter-group");

      groups.forEach((group, index) => {
        const letterDelay = index * 0.12;

        const vLines = group.querySelectorAll<SVGLineElement>(".v-line");
        if (vLines.length > 0) {
          gsap.set(vLines, {
            strokeDasharray: (_i, target: any) =>
              `0 ${(target as SVGGeometryElement).getTotalLength() * 2}`,
            strokeDashoffset: 0,
            opacity: 0,
          });

          tl.to(
            vLines,
            {
              strokeDasharray: (_i, target: any) => {
                const len = (target as SVGGeometryElement).getTotalLength();
                return `${len} ${len * 2}`;
              },
              opacity: 1,
              duration: 0.9,
              ease: premiumEase,
            },
            letterDelay
          );
        }

        const hElements = group.querySelectorAll<SVGLineElement>(".h-element");
        hElements.forEach((el) => {
          const delayStr = el.getAttribute("data-delay");
          const additionalDelay = delayStr ? parseFloat(delayStr) : 0;
          const length = el.getTotalLength();

          gsap.set(el, {
            strokeDasharray: `0 ${length * 2}`,
            strokeDashoffset: 0,
            opacity: 0,
          });

          tl.to(
            el,
            {
              strokeDasharray: `${length} ${length * 2}`,
              opacity: 1,
              duration: 0.7,
              ease: premiumEase,
            },
            letterDelay + additionalDelay
          );
        });
      });

      tl.to(
        ".text-svg",
        {
          filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        },
        "+=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [renderData, onComplete]);

  return (
    <div ref={containerRef} style={styles.wrapper}>
      <svg
        className="text-svg"
        viewBox={`0 0 ${totalWidth} 200`}
        style={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderData.map((item) => (
          <g key={item.id} className="letter-group">
            {item.def.verticals.map((v, vIdx) => (
              <React.Fragment key={`v-${vIdx}`}>
                {v.top !== false && (
                  <line
                    className="v-line"
                    x1={item.startX + v.x}
                    y1={100}
                    x2={item.startX + v.x}
                    y2={50}
                    style={styles.stroke}
                  />
                )}
                {v.bottom !== false && (
                  <line
                    className="v-line"
                    x1={item.startX + v.x}
                    y1={100}
                    x2={item.startX + v.x}
                    y2={150}
                    style={styles.stroke}
                  />
                )}
              </React.Fragment>
            ))}

            {item.def.elements.map((el, elIdx) => (
              <line
                key={`el-${elIdx}`}
                className="h-element"
                data-delay={el.delay}
                x1={item.startX + el.x1}
                y1={el.y1}
                x2={item.startX + el.x2}
                y2={el.y2}
                style={styles.stroke}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

const styles: {
  wrapper: React.CSSProperties;
  svg: React.CSSProperties;
  stroke: React.CSSProperties;
} = {
  wrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
    overflow: "hidden",
  },
  svg: {
    width: "100%",
    maxWidth: "1200px",
    maxHeight: "250px",
    filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
  },
  stroke: {
    stroke: "#ffffff",
    strokeWidth: 3,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))",
  },
};


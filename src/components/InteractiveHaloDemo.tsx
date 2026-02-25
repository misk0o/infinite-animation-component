"use client";

import React, { useState, FormEvent } from "react";
import HaloLoader from "./HaloLoader";

export default function InteractiveHaloDemo() {
  const [inputValue, setInputValue] = useState("MISK0");
  const [activeText, setActiveText] = useState("MISK0");
  // We use a key to force the HaloLoader to completely remount, which resets the GSAP timeline
  const [animationKey, setAnimationKey] = useState(0);

  const handleGenerate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    const cleanText = inputValue.trim().toUpperCase() || "MISK0";
    setActiveText(cleanText);
    setAnimationKey((prev) => prev + 1); // Triggers the remount
  };

  return (
    <div className="interactive-container">
      {/* SVG Animation Wrapper */}
      <div className="canvas-area">
        <HaloLoader key={animationKey} text={activeText} runOnce={false} />
      </div>

      {/* UI Controls */}
      <form className="controls-area" onSubmit={handleGenerate}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          maxLength={15}
          spellCheck={false}
          autoComplete="off"
          placeholder="ENTER TEXT"
          className="sci-fi-input"
        />
        <button type="submit" className="sci-fi-button">
          Animate
        </button>
      </form>

      {/* Scoped CSS for the UI elements */}
      <style jsx>{`
        .interactive-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #0a0a0a;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: monospace;
          overflow: hidden;
        }

        .canvas-area {
          width: 100%;
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          /* HaloLoader itself is 100vh, so we scale it to fit nicely with controls */
          margin-bottom: 0;
        }

        .controls-area {
          position: absolute;
          bottom: 50px;
          display: flex;
          gap: 15px;
          opacity: 0.5;
          transition: opacity 0.4s ease;
          z-index: 10;
        }

        .controls-area:hover,
        .controls-area:focus-within {
          opacity: 1;
        }

        .sci-fi-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 12px 24px;
          font-family: monospace;
          font-size: 18px;
          text-transform: uppercase;
          outline: none;
          letter-spacing: 4px;
          width: 300px;
          text-align: center;
          border-radius: 4px;
          transition: border 0.3s;
        }

        .sci-fi-input:focus {
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .sci-fi-button {
          background: #ffffff;
          color: #0a0a0a;
          border: none;
          padding: 12px 30px;
          font-family: monospace;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 4px;
          transition: transform 0.1s, box-shadow 0.2s;
        }

        .sci-fi-button:active {
          transform: scale(0.96);
        }

        .sci-fi-button:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}


"use client"
import React, { useEffect, useState } from "react";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true); // The popup starts as visible.

  useEffect(() => {
    // Dynamically load the Fillout embed script
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsVisible(false)} // Close on background click
    >
      <div
        className="bg-white rounded-lg w-11/12 max-w-xl p-4 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <div
          className="w-full h-[500px]"
          data-fillout-id="9ozo5hkcnZus"
          data-fillout-embed-type="standard"
          data-fillout-inherit-parameters
          data-fillout-dynamic-resize
        ></div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Popup;

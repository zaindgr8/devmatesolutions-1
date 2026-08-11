import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import FormApp from "./FormApp";

const FormModal = ({ isOpen, onClose }) => {
  const portalRoot = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Create portal target lazily (SSR-safe)
  useEffect(() => {
    portalRoot.current = document.body;
  }, []);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Full-screen backdrop — closes modal on click */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Modal card — stop propagation so clicks inside don't close */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            width: "100%",
            maxWidth: "520px",
            maxHeight: "90vh",
            overflowY: "auto",
            animation: "modalSlideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "14px",
              right: "16px",
              background: "transparent",
              border: "none",
              fontSize: "22px",
              lineHeight: 1,
              cursor: "pointer",
              color: "#9ca3af",
              zIndex: 10,
              padding: "4px 8px",
              borderRadius: "6px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
            onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
          >
            ×
          </button>

          {/* Form */}
          <div style={{ padding: "12px 4px 4px 4px" }}>
            <FormApp />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modalSlideIn {
          from { transform: translateY(-30px) scale(0.95); opacity: 0; }
          to   { transform: translateY(0)    scale(1);    opacity: 1; }
        }
      ` }} />
    </>
  );

  // Portal: attach to document.body regardless of where this component is called
  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
};

export default FormModal;

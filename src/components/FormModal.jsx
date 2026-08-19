import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import FormApp from "./FormApp";

const FormModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badgeLabel,
  badgeSub,
  badgeHighlight,
  triggerCall,
  source,
  buttonText,
}) => {
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
      <div className="dm-modal-overlay" onClick={onClose}>
        <div className="dm-modal-box" onClick={(e) => e.stopPropagation()}>
          <FormApp
            title={title}
            subtitle={subtitle}
            badgeLabel={badgeLabel}
            badgeSub={badgeSub}
            badgeHighlight={badgeHighlight}
            triggerCall={triggerCall}
            source={source}
            buttonText={buttonText}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );

  // Portal: attach to document.body regardless of where this component is called
  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
};

export default FormModal;

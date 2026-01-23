import React, { useState, useEffect } from "react";
import FormApp from "./FormApp";

const FormModal = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(isOpen !== undefined ? isOpen : true);

  // Update internal state when prop changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="relative bg-white dark:bg-[#18181b] rounded-2xl shadow-lg flex flex-col w-full max-w-xl max-h-[90vh] mx-2 p-0 pointer-events-auto max-h-[90vh] overflow-y-auto flex flex-col"
        style={{ minWidth: 0 }}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-end p-4 pb-0 sticky top-0 bg-white dark:bg-[#18181b] rounded-t-2xl z-10">
          <button
            className="text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none transition"
            onClick={handleClose}
            aria-label="Cancel lead form"
          >
            &times;
          </button>
        </div>
        {/* Scrollable Form Content */}
        <div
          className="overflow-y-auto px-6 pb-6 pt-2"
          style={{ maxHeight: "calc(90vh - 56px)" }}
        >
          <FormApp />
        </div>
      </div>
      {/* Animations */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            transform: translateY(-40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .shadow-2xl {
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
        }
      `}</style>
    </div>
  );
};

export default FormModal;

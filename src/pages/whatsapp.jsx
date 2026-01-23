import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  const handleClick = async () => {
    const phoneNumber = "971585984869"; // Replace with your WhatsApp number
    const message =
      "Hi there! I'm interested in learning more about DEVMATE Digital Marketing and Software Solutions. Could you please provide me with more details? Thanks!";
    const encodedMessage = encodeURIComponent(message);

    // Determine if WhatsApp is installed
    const isWhatsAppInstalled = /WhatsApp/.test(navigator.userAgent);

    // Construct the URL based on whether WhatsApp is installed or not
    let url;
    if (isWhatsAppInstalled) {
      url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
      url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    }

    // Open URL in a new tab
    window.open(url, "_blank");
  };

  return (
    <button
      className="bg-green-600 z-20 w-min p-2 rounded-full fixed bottom-10 right-4 cursor-pointer md:right-8"
      onClick={handleClick}
    >
      <FaWhatsapp color="white" className="w-7 h-7 md:w-10 md:h-10" />
    </button>
  );
};

export default Whatsapp;

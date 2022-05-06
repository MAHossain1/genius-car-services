import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="text-center mt-5">
      <p>
        <small>
          <span>Copyright © GeniusCarServices {new Date().getFullYear()}</span>
        </small>
        <br />
        <small>Copyright ©{year}</small>
      </p>
    </footer>
  );
};

export default Footer;

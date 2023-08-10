import React, { useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {showButton && (
        <div
          className="fixed right-5 bottom-5 flex justify-center items-center w-8 h-8 rounded-full bg-primary shadow-md cursor-pointer"
          onClick={scrollToTop}
        >
          <BiUpArrowAlt className="text-white text-lg" />
        </div>
      )}
    </>
  );
}

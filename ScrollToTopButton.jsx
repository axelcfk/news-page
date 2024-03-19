import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      // 800 decides how far to scroll for the button to show up
      const isVisible = currentScrollPos > 800;
      setIsVisible(isVisible);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      // top 0 is the top of the page. This is where the button will take us when clicked. 
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div>
      {isVisible && (
        <button className="topButton" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} className="icon" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;


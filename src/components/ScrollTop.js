import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../CSS/ScrollTop.css";

function ScrollTop() {
  
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);

  if (!visible) {
    return false;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={scrollToTop} className="scroll-top-button">
      <div className="scroll-top-icon">
        <FontAwesomeIcon icon={faChevronUp} />
      </div>
    </div>
  );
}

export default ScrollTop;

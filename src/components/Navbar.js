import React, { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import "../CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const { y: pageYOffset } = useWindowScroll();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (pageYOffset > 50) {
      setDark(false);
    } else {
      setDark(true);
    }
  }, [pageYOffset]);

  const handleEnterClick = (e) => {
    if (e.keyCode !== 13 || searchTerm == "") {
      return;
    }
    let link = "/pokemon/" + searchTerm.trim().toLowerCase();
    setSearchTerm("");
    navigate(link);
  };
  return (
    <div
      style={{ backgroundColor: dark == true ? "#191919" : "#141414" }}
      className="navbar"
    >
      <Link to="/">
        <div className="navbar-icon brand">
          <FontAwesomeIcon icon={faClapperboard} />
          <p>PikaChu</p>
        </div>
      </Link>

      <div className="navbar-search">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleEnterClick(e)}
          value={searchTerm}
          className="navbar-search-input"
          type="text"
          placeholder="ex: Pikachu"
        />
        <div className="navbar-icon forward">
          <FontAwesomeIcon icon={faForward} />
        </div>
      </div>

      
    </div>
  );
}

export default Navbar;

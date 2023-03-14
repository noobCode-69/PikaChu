import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useWindowScroll } from "react-use";

import PokemonItem from "./PokemonItem";

import "../CSS/PokemonList.css";
import axios from "axios";

function PokemonList() {
  // console.log("rendering");

  let navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [currPokemons, setCurrPokemons] = useState([]);
  const { y: pageYOffset } = useWindowScroll();

  const page = useParams().pageNumber;

  useEffect(() => {
    scrollToTop();
    loadLatestPokemons();
  }, [page]);

  async function loadLatestPokemons() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 10}&limit=10`
      );

      let urls = await response.data.results.map((obj) => {
        return obj.url;
      });

      setCurrPokemons(urls);
    } catch (error) {
      console.log(error.message);
    }
  }

  function loadNext() {
    navigate(`/pokemonlist/${Number(page) + 1}`);
  }

  function loadPrev() {
    if (page == 1) {
      return;
    }
    navigate(`/pokemonlist/${Number(page) - 1}`);
  }

  function getList() {
    let start = Math.max(1, page - 2);
    let end = start + 5;

    let arr = [];
    for (let i = start; i < end; ++i) {
      arr.push(i);
    }

    return arr.map((number) => {
      if (number == page) {
        return (
          <Link to={`/${number}`}>
            <div
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                backgroundColor: "#292f37",
                border: "1px solid #444e5b",
                borderRadius: "2px",
                color: "99d4ff",
              }}
            >
              {number}
            </div>
          </Link>
        );
      } else {
        return (
          <Link to={`/pokemonlist/${number}`}>
            {" "}
            <div>{number}</div>
          </Link>
        );
      }
    });
  }

  return (
    <div>
      {currPokemons.length == 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="pokemonlist-container">
          {currPokemons.map((pokemon) => (
            <PokemonItem url={pokemon} />
          ))}
        </div>
      )}

      {currPokemons.length != 0 && (
        <div className="pparent">
          {" "}
          <button onClick={loadPrev} className="pokemonlist-load-more-button">
            {" "}
            Prev
          </button>
          {getList()}
          <button onClick={loadNext} className="pokemonlist-load-more-button">
            {" "}
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
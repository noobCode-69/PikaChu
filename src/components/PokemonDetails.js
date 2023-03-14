import "../CSS/PokemonDetails.css";

import React, { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import { useWindowScroll } from "react-use";


import axios from "axios";



function PokemonPage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pokemonName = useParams().pokemonName;


  const navigate = useNavigate();

  let [name, setName] = useState(null);
  let [experience, setExperience] = useState(null);
  let [height, setHeight] = useState(null);
  let [weight, setWeight] = useState(null);
  let [imageUrl, setImageUrl] = useState(null);
  let [color, setColor] = useState(null);
  let [text, setText] = useState(null);

  const { y: pageYOffset } = useWindowScroll();

  useEffect(() => {
    scrollToTop();
    getPokemonDetails();
    getSpeciesDetails();
  }, [pokemonName]);

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  async function getPokemonDetails() {
    try {
      const response = await axios(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
      );
      let {
        name,
        base_experience: experience,
        height,
        weight,
        sprites,
      } = response.data;
      let imageUrl = sprites.other["official-artwork"].front_default;

      // state  name, experience, height, weight , imageUrl
      setName(name);
      setExperience(experience);
      setHeight(height);
      setWeight(weight);
      setImageUrl(imageUrl);
    } catch (error) {
      navigate("/somerandomroute")
      console.log(error.message);
      
    }
  }

  async function getSpeciesDetails() {
    try {
      const response = await axios(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`
      );

      let { color, flavor_text_entries } = response.data;

      flavor_text_entries = flavor_text_entries.filter((obj) => {
        if (obj.language.name == "en") {
          return true;
        }
        return false;
      });

      flavor_text_entries = flavor_text_entries.map((obj) => {
        return obj.flavor_text;
      });

      flavor_text_entries = removeDuplicates(flavor_text_entries);

      flavor_text_entries = flavor_text_entries.filter((text, index) => {
        if (index > 4) return false;
        return true;
      });

      flavor_text_entries = flavor_text_entries.map((text) => {
        return text.replace(/[\r\n\f]/gm, " ");
      });

      let text = flavor_text_entries.join("");

      setColor(color.name);
      setText(text);
    } catch (error) {
      navigate("/somerandomroute")
      console.log(error.message);
    }
  }

  return (
    <>
      {name == null ||
      experience == null ||
      height == null ||
      weight == null ||
      imageUrl == null ||
      color == null ||
      text == null ? (
        <h1>Loading</h1>
      ) : (
        <div className="pokemon-details-container">
          <div className="pokemon-details-poster-container">
            <img src={imageUrl} />
          </div>

          <div className="pokemon-details-info-container">
            <div className="info-fragment fragment-general">
              <div className="pokemon-details-info info-title info-fragment-title">
                {name.toUpperCase()}
              </div>

              <div className="pokemon-details-info info-rating">
                <div className="pokemon-details-info-label">Height :</div>
                {height / 10}m
              </div>

              <div className="pokemon-details-info info-rating">
                <div className="pokemon-details-info-label">Weight :</div>
                {weight / 10}kg
              </div>

              <div className="pokemon-details-info info-runtime">
                <div className="pokemon-details-info-label">Experience :</div>
                {experience}
              </div>

              <div className="pokemon-details-info info-released">
                <div className="pokemon-details-info-label">Color :</div>
                <div style={{ color: color }}>{color.toUpperCase()}</div>
              </div>
            </div>

            <div className="info-fragment fragment-cast">
              <div className="info-fragment-title">About</div>
              <div className="pokemon-details-description">
                <p> {text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonPage;

import React, { useEffect, useState } from "react";
import "../CSS/PokemonItem.css";
import axios from "axios";

import { Link } from "react-router-dom";

function PokemonItem({ url }) {
  
  let [name, setName] = useState(null);
  let [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {

    let getPokemonDetails = async () => {
      let response = await axios.get(url);
      setName(response.data.name);
      setImageUrl(
        response.data.sprites.other["official-artwork"].front_default
      );
    };

    getPokemonDetails();
  }, [url]);

  return (
    <div className="pokemon-item-container">
      {name != null && imageUrl != null && (
        <Link to={`/pokemon/${name}`}>
          {/* change the link */}
          <div className="pokemon-item-poster">
            <img src={imageUrl} />
          </div>
          <div className="pokemon-item-title">{name.toUpperCase()}</div>
        </Link>
      )}
    </div>
  );
}

export default PokemonItem;

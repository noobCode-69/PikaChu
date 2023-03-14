import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./CSS/App.css";

import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import Notfound from "./components/Notfound";
import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./components/PokemonList";
import Home from './components/Home'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path="/pokemonlist/:pageNumber" element={<PokemonList />} />
          <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
      <ScrollTop />
    </div>
  );
}

//routing

// context wrap

export default App;

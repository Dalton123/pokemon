import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Pokemon from "./Pokemon";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState("");

  function fetchData() {
    let allPokemon = [];
    const POKE_COUNT = 50;

    for (let i = 1; i < POKE_COUNT + 1; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((res) => res.json())
        .then((data) => allPokemon.push(data));
    }
    setPokemon(allPokemon);
  }

  // async function fetchData(id) {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //   const data = await response.json();
  //   return data;
  // }

  // async function gatherPokemon() {
  //   const results = await Promise.all(requests);
  //   let mergeData = [];

  //   for (let i = 0; i < results.length; i++) {
  //     mergeData = mergeData.concat(results[i]);
  //   }
  //   setPokemon(mergeData);
  //   setFilteredPokemon(mergeData);
  // }

  // for (let i = 1; i < 100; i++) {
  //   requests.push(fetchData(i));
  // }

  useEffect(() => {
    document.title = "PokeDex";
    fetchData();
  }, []);

  useEffect(() => {
    // Filter out available exercise based on search state
    const filteredData = pokemon.filter((d) => d.name.startsWith(search));

    setFilteredPokemon((prev) => (search !== 0 ? filteredData : pokemon));
  }, [search, pokemon]);

  function handleChange(event) {
    let timeout;
    // Get input value
    const { value } = event.target;

    // Clear the timeout
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      // Store into search state
      setSearch((prev) => value.toLowerCase());
    }, 0);
  }

  return (
    <div className="App">
      <Header handleChange={handleChange} search={search} />
      <div className="pokemon-container">
        {filteredPokemon
          ? filteredPokemon.map((p) => {
              return <Pokemon key={p.id} {...p} />;
            })
          : pokemon.map((p) => {
              return <Pokemon key={p.id} {...p} />;
            })}
      </div>
    </div>
  );
}

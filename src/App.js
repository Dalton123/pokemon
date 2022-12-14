// https://sg.portal-pokemon.com/play/pokedex/001
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Pokemon from "./Pokemon";
import { nanoid } from "nanoid";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState("");

  function fetchData() {
    console.log(pokemon);
    console.log("begin fetch");
    let allPokemon = [];
    const POKE_COUNT = 9;

    for (let i = 1; i < POKE_COUNT + 1; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((res) => res.json())
        .then((data) => allPokemon.push(data));
    }
    console.log("set pokemon");
    setPokemon(allPokemon);
    console.log(pokemon);
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
    const filteredData = pokemon.filter((d) => d.name.includes(search));

    setFilteredPokemon((prev) => (search !== "" ? filteredData : pokemon));
  }, [search]);

  function handleChange(event) {
    // Get input value
    const { value } = event.target;

    // Store into search state
    setSearch((prev) => value.toLowerCase());
  }

  return (
    <div className="App">
      <Header handleChange={handleChange} search={search} />
      <div className="pokemon-container">
        {filteredPokemon
          ? filteredPokemon.map((p) => {
              console.log("show filtered");
              return <Pokemon key={nanoid()} {...p} />;
            })
          : pokemon.map((p) => {
              console.log("show pokemon");
              return <Pokemon key={nanoid()} {...p} />;
            })}
      </div>
    </div>
  );
}

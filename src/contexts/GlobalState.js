import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/url";

export default function GlobalState(props) {
  const [pokelist, setPokelist] = useState([]);
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    fetchPokelist();
  }, []);

  const fetchPokelist = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setPokelist(response.data.results);
    } catch (error) {
      console.log("Erro ao buscar lista de pokemons");
      console.log(error.response);
    }
  };

  const addToPokedex = (pokemonToAdd) => {
    const isAlreadyOnPokedex = pokedex.find(
      (pokemonInPokedex) => pokemonInPokedex.name === pokemonToAdd.name
    );

    if (!isAlreadyOnPokedex) {
      const newPokedex = [...pokedex, pokemonToAdd];
      setPokedex(newPokedex);
    }
  };

  const removeFromPokedex = (pokemonToRemove) => {
    const newPokedex = pokedex.filter(
      (pokemonInPokedex) => pokemonInPokedex.name !== pokemonToRemove.name
    );

    setPokedex(newPokedex);
  };

  const context = {
    //quando a propriedade tem o mesmo nome q o valor, dá pra só colocar pokelist, addToPokedex, etc, sem os dois pontos e repetição do valor
    pokelist: pokelist,
    addToPokedex: addToPokedex,
    pokedex: pokedex,
    removeFromPokedex: removeFromPokedex
  };
  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

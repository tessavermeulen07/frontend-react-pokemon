import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import pokemonCard from "./components/PokemonCard.jsx";
import PokemonCard from "./components/PokemonCard.jsx";


function App() {

    const [pokemon, setPokemon] = useState(null);

    async function fetchPokemon() {
        try {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon/');
            console.log(result);
            setPokemon(result.data);
        } catch (error) {
            `Het laden van de Pokemon is niet gelukt`
            console.log(error);
        }
    }

    useEffect(() => {
        void fetchPokemon();
    }, []);

    return (
        <>
            <h1>Gotta catch em all!</h1>

            <ul className="main-container">
                {pokemon?.results?.length > 0 &&
                    (pokemon?.results?.map((pokemon) => {
                        return <li key={pokemon.name}>
                            <PokemonCard
                                url={pokemon.url} className="pokemon-card"
                            />
                        </li>
                    }))
                }
            </ul>
        </>
    )
}

export default App

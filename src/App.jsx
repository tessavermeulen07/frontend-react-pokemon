import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import pokemonCard from "./components/PokemonCard.jsx";
import PokemonCard from "./components/PokemonCard.jsx";


function App() {

    const [pokemon, setPokemon] = useState(null);
    const [loading, toggleLoading] = useState (false);
    const [error, toggleError] = useState(false);
    const [currentURL, setCurrentURL] = useState('https://pokeapi.co/api/v2/pokemon/')

    async function fetchPokemon() {
        try {
            toggleLoading(true);
            toggleError(false);
            const result = await axios.get(currentURL);
            setPokemon(result.data);
        } catch (error) {
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }


    useEffect(() => {
        void fetchPokemon();
    }, [currentURL]);


    return (
        <>
            <h1>Gotta catch em all!</h1>
            <div className="button-box">
                <button
                type="button"
                disabled={pokemon?.previous === null}
                    onClick={() => {setCurrentURL(pokemon?.previous);}}
                >
                    Vorige
                </button>

                <button
                type="button"
                disabled={pokemon?.next === null}
                onClick={() => {setCurrentURL(pokemon?.next);}}
                >
                    Volgende
                </button>
            </div>

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

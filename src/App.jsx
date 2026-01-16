import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";
import Loading from "./components/loading/Loading.jsx";


function App() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [currentURL, setCurrentURL] = useState('https://pokeapi.co/api/v2/pokemon/')

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPokemon() {
            try {
                toggleLoading(true);
                toggleError(false);
                const result = await axios.get(currentURL, {
                    signal: controller.signal,
                });
                setPokemon(result.data);
            } catch (error) {
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }
            void fetchPokemon();
    }, [currentURL]);


    return (
        <>
            {loading && <Loading/>}
            {!loading && error && <span className="error-span">{error &&
                <p>De Pokemon wilden niet laden. Probeer het later opnieuw</p>}
            </span>}


            <div className="button-box">
                <button
                    type="button"
                    disabled={pokemon?.previous === null}
                    onClick={() => {
                        setCurrentURL(pokemon?.previous);
                    }}
                >
                    Vorige
                </button>

                <button
                    type="button"
                    disabled={pokemon?.next === null}
                    onClick={() => {
                        setCurrentURL(pokemon?.next);
                    }}
                >
                    Volgende
                </button>
            </div>

            {!loading && !error && pokemon?.results?.length > 0 &&
                <ul className="main-container">
                    {pokemon?.results?.map((pokemon) => {
                        return <li key={pokemon.name}>
                            <PokemonCard
                                url={pokemon.url} className="pokemon-card"
                            />
                        </li>
                    })}
                </ul>}

        </>
    )
}

export default App

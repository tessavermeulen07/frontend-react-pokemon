import {useEffect, useState} from "react";
import axios from "axios";
import './PokemonCard.css';
import Loading from "../loading/Loading.jsx"

function PokemonCard({url}) {

    const [pokemon, setPokemon] = useState({});
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
    async function singlePokemon() {
        try {
            toggleLoading(true);
            toggleError(false);
            const result = await axios.get(url, {
                signal:controller.signal});
            setPokemon(result.data);
        } catch (error) {
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }
        void singlePokemon();
    }, []);

    useEffect(() => {
        console.log('loading:', loading);
    }, [loading]);

    if (loading) return <Loading/>;
    if (error) return <span className="error-span">{error &&
        <p>De Pokemon wilden niet laden. Probeer het later opnieuw</p>}
            </span>;
    if(!pokemon) return null;

    return (
        <>

           {Object.keys(pokemon).length > 0 &&
                <article className="pokemon-card">
                    <h3>{pokemon.name}</h3>
                    <span><img src={pokemon.sprites.front_default} alt={pokemon.name}/></span>
                    <span>Moves: {pokemon.moves.length}</span>
                    <span>Weight: {pokemon.weight}</span>
                    <span>Abilities:</span>
                    <ul className="pokemon-card-list">
                        {pokemon.abilities.map((ability) => (
                            <li key={ability.ability.name}>
                                {ability.ability.name}
                            </li>
                        ))}
                    </ul>
                </article>}

        </>
    )
}

export default PokemonCard;
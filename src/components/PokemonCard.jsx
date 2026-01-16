import {useEffect, useState} from "react";
import axios from "axios";

function PokemonCard({url}) {

    const [pokemon, setPokemon] = useState({});

    async function singlePokemon() {
        try {
            const result = await axios.get(url);
            console.log(result);
            setPokemon(result.data);
        } catch (error) {
            `Het laden van de Pokemon is niet gelukt`
            console.log(error);
        }
    }

    useEffect(() => {
        void singlePokemon();
    }, []);

    return (
        <>
            {Object.keys(pokemon).length > 0 &&
                <article className="pokemon-card">
                    <h3>{pokemon.name}</h3>
                    <span><img src={pokemon.sprites.front_default} alt={pokemon.name} /></span>
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
                </article>
            }
        </>
    )
}

export default PokemonCard;
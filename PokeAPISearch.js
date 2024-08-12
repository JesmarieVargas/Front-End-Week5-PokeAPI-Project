document.getElementById('searchButton').addEventListener('click', async () => {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase().trim();
    if (pokemonInput) {
        const pokemonData = await fetchPokemonData(pokemonInput);
        if (pokemonData) {
            displayPokemonData(pokemonData);
        } else {
            document.getElementById('pokemonInfo').innerHTML = '<div class="alert alert-danger">Pokémon not found</div>';
        }
    }
});

async function fetchPokemonData(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}

function displayPokemonData(data) {
    document.getElementById('pokemonInfo').innerHTML = `
        <div class="card">
            <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${data.name}</h5>
                <p class="card-text"><strong>Type:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p class="card-text"><strong>Abilities:</strong> ${data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
                <p class="card-text"><strong>Stats:</strong> ${data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ')}</p>
            </div>
        </div>
    `;
}

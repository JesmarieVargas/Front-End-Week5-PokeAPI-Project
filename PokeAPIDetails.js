document.addEventListener('DOMContentLoaded', async () => {
    const pokemonId = 1; // Example Pokémon ID, you can change this or get it dynamically
    const pokemonData = await fetchPokemonData(pokemonId);
    if (pokemonData) {
        displayPokemonDetails(pokemonData);
    }
});

async function fetchPokemonData(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}

function displayPokemonDetails(data) {
    document.getElementById('pokemonDetails').innerHTML = `
        <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
        <div class="card-body">
            <h5 class="card-title text-capitalize">${data.name}</h5>
            <p class="card-text"><strong>Type:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <div class="accordion" id="pokemonAccordion">
                <div class="card text-center">
                    <div class="card-header" id="headingAbilities">
                        <h2 class="mb-0">
                            Abilities
                        </h2>
                    </div>
                    <div id="collapseAbilities" class="collapse show" aria-labelledby="headingAbilities" data-parent="#pokemonAccordion">
                        <div class="card-body">
                            ${data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}
                        </div>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-header" id="headingStats">
                        <h2 class="mb-0">
                            Stats
                        </h2>
                    </div>
                        <div class="card-body">
                        <ul class= "list-unstyled">
                        ${data.stats.map(statInfo => `<li>${statInfo.stat.name} : ${statInfo.base_stat}</li>`).join('')}
                        
                        </ul>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

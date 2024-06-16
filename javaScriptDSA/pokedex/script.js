const allPokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';
// all text elements
const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const types = document.getElementById('types');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// for sprite
const pokemonSprite = document.getElementById('pokemon-sprite');

// for search button
const searchButton = document.getElementById('search-button');

// Function for clearing innerText
const resetText = () => {
  pokemonId.textContent = '';
  pokemonName.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  hp.textContent = '';
  types.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

// Function to update text content of all elements with pokemon data
const updateText = (pokemonData) => {
  pokemonId.textContent = pokemonData.id;
  pokemonName.textContent = pokemonData.name;
  weight.textContent = pokemonData.weight;
  height.textContent = pokemonData.height;
  hp.textContent = pokemonData.stats[0].base_stat;
  pokemonData.types.forEach(typeInfo => {
    const typeSpan = document.createElement('span');
    typeSpan.textContent = typeInfo.type.name.toUpperCase();
    types.appendChild(typeSpan);
  });
  attack.textContent = pokemonData.stats[1].base_stat;
  defense.textContent = pokemonData.stats[2].base_stat;
  specialAttack.textContent = pokemonData.stats[3].base_stat;
  specialDefense.textContent = pokemonData.stats[4].base_stat;
  speed.textContent = pokemonData.stats[5].base_stat;
};

// Function to update pokemon sprite
const updateSprite = (pokemonData) => {
  pokemonSprite.innerHTML = `
    <img src='${pokemonData.sprites.front_default}' alt='Front Default' />    
    `;
};

// Function for fetching Pokemon
const fetchPokemon = (pokemonNameId) => {
  const url = `${allPokemonUrl}${pokemonNameId}`;

  return fetch(url)
  .then(response => {
      if(!response.ok)
        throw new Error('HTTP error! Status: ${response.status}');
      
      return response.json();
    }
  )
  .then(data => {
    const pokemonData = data;
    
    console.log(pokemonData);
    return data;
  })
  .catch(error => {
    throw new Error(`Error fetching data for Pokémon ${pokemonNameOrId}:`, error);
    // return null;
  });
};

const searchHandler = (pokemon) => {
  resetText();
  fetchPokemon(pokemon)
    .then(pokemonData => {
      if(pokemonData){
        updateText(pokemonData);
        updateSprite(pokemonData);
      }  
    })
    .catch(error => {
      alert("Pokémon not found");
      console.log(error);
    });
};

searchButton.addEventListener('click', () => {
  const pokemon = document.getElementById('search-input').value.toLowerCase().trim();
  if(pokemon){    
    searchHandler(pokemon);
  }
});

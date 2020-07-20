document.addEventListener("DOMContentLoaded", start);

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainerContainer = document.createElement('div');
trainerContainer.classList = 'trainer-container';
document.querySelector('main').appendChild(trainerContainer);

const fetchTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(trainer => displayTrainer(trainer)))
}

const displayTrainer = (trainer) => {
    //console.log(trainer);
    const trainerCard = document.createElement('div');
    trainerCard.classList = 'card';
    trainerCard.dataset.id = `${trainer.id}`;

    const pTag = document.createElement('p');
    pTag.innerText = `${trainer.name}`;
    trainerCard.appendChild(pTag);

    const addPokemonButton = document.createElement('button');
    addPokemonButton.dataset.trainerId = `${trainer.id}`;
    addPokemonButton.innerHTML = 'Add Pokemon';
    trainerCard.appendChild(addPokemonButton);
    trainerContainer.appendChild(trainerCard);

    const pokemonList = document.createElement('ul');
    pokemonList.dataset.id = `${trainer.id}`;
    trainerCard.appendChild(pokemonList);

    trainer.pokemons.forEach(pokemon => displayPokemon(pokemon, pokemonList));

}

const displayPokemon = (pokemon, list) => {
    const pokemonli = document.createElement('li');
    pokemonli.id = `${pokemon.id}`;
    pokemonli.innerText = `${pokemon.nickname} (${pokemon.species})`;

    const releaseButton = document.createElement('button');
    releaseButton.classList = 'release';
    releaseButton.setAttribute("data-pokemon-id", pokemon.id);
    releaseButton.innerText = "Release";

    releaseButton.addEventListener('click', releasePokemon);
    pokemonli.appendChild(releaseButton);
    
    if(!list){
        list = e.target.parentElement.lastElementChild
      }
    list.appendChild(pokemonli)
}

const releasePokemon = (pokemon) => {

}

function start() {
    fetchTrainers();    
}


//})





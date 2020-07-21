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
    .catch(error => console.log(error))
}

const displayTrainer = (trainer) => {
    const trainerCard = document.createElement('div');
    trainerCard.classList = 'card';
    trainerCard.dataset.id = `${trainer.id}`;

    const pTag = document.createElement('p');
    pTag.innerText = `${trainer.name}`;
    trainerCard.appendChild(pTag);

    const addPokemonButton = document.createElement('button');
    addPokemonButton.classList = 'add';
    addPokemonButton.dataset.trainerId = `${trainer.id}`;
    addPokemonButton.innerHTML = 'Add Pokemon';
    //addPokemonButton.addEventListener('click', addPokemon);

    trainerCard.appendChild(addPokemonButton);
    trainerContainer.appendChild(trainerCard);

    const pokemonList = document.createElement('ul');
    pokemonList.dataset.id = `${trainer.id}`;
    trainerCard.appendChild(pokemonList);

    trainer.pokemons.forEach(pokemon => displayPokemon(pokemon, pokemonList));
}

const displayPokemon = (pokemon, list) => {
    const pokemonli = document.createElement('li');
    pokemonli.dataset.pokemonId = `${pokemon.id}`;
    pokemonli.innerText = `${pokemon.nickname} (${pokemon.species})`;

    const releaseButton = document.createElement('button');
    releaseButton.classList = 'release';
    releaseButton.setAttribute("data-pokemon-id", pokemon.id);
    releaseButton.innerText = "Release";

    //releaseButton.addEventListener('click', releasePokemon);
    pokemonli.appendChild(releaseButton);
    
    if(!list){
        list = e.target.parentElement.lastElementChild
      }
    list.appendChild(pokemonli)
}

const generateNewPokemon = (trainerId, ul) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    }

    fetch(POKEMONS_URL, options)
    .then(response => response.json())
    .then(pokemon => displayPokemon(pokemon, ul))
    .catch(console.log)
}

const fetchDelete = (pokemonId, li) => {
    const options = {
        method: 'DELETE'
    }
    fetch(`${POKEMONS_URL}/${pokemonId}`, options)
    .then(response => response.json())
    .then(li.remove())
}

const buttons = () => {
document.addEventListener('click', (e) => {
    if (e.target.className === 'add') {
        let trainerId = e.target.dataset.trainerId;
        let ul = e.target.parentNode.querySelector('ul');
        if (ul.querySelectorAll("li").length < 6) {
            generateNewPokemon(trainerId, ul);
        }
    } else if (e.target.className === 'release') {
        let pokemonId = e.target.dataset.pokemonId;
        let li = e.target.parentNode;
        fetchDelete(pokemonId, li);
    }
})
}

function start() {
    fetchTrainers();    
    buttons();
}





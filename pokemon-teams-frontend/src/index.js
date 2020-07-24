const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", ()=> { 

function renderTrainers(trainerArray){
    trainerArray.forEach(trainerObj => {
        renderTrainer(trainerObj)
        trainerObj.pokemons.forEach(pokemon => {
            renderPokemon(pokemon)
        })
    })
}

function renderTrainer(trainerObj) {
    const trainerDiv = document.createElement('div')
    trainerDiv.className = "card"
    trainerDiv.dataset.id = trainerObj.id 
    const trainerP = document.createElement('p')
    trainerP.innerText = trainerObj.name
    trainerDiv.innerHTML = `<p>${trainerP.innerText}</p>`
    const button = document.createElement('button')
    button.dataset.id = trainerObj.id
    button.innerText = 'Add Pokemon'
    trainerDiv.appendChild(button)
    const ul = document.createElement('ul')
    trainerDiv.appendChild(ul)
    const main = document.querySelector('main')
    main.appendChild(trainerDiv)

}

function renderPokemon(pokemonObj) {
    const li = document.createElement('li')
    const pokeButton = document.createElement('button')
    pokeButton.className = "release"
    pokeButton.dataset.id = pokemonObj.id
    li.innerHTML = `${pokemonObj.nickname} (${pokemonObj.species}) <button class= ${pokeButton.className} data-pokemon-id= ${pokeButton.dataset.id}>Release</button>` 
    const trainerId = pokemonObj.trainer_id
    const ul = document.querySelectorAll('div[data-id]')[trainerId-1]
    ul.appendChild(li)

}    


const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
        renderTrainers(trainers);
    }) 
}

getTrainers()

})


document.addEventListener("click", (event) => {
    console.log(event.target)

})

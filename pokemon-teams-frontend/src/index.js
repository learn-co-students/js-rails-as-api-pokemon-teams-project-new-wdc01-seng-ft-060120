const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => displayTrainers(trainers))
  .catch(error => console.log(error))

  const main = document.querySelector('main')
  function displayTrainers(trainers) {
    trainers.forEach( trainer => {
      // Create Card
      const cardDiv = document.createElement('div')
      cardDiv.className = 'card'
      cardDiv.dataset.id = trainer.id
      // Add Name
      const nameP = document.createElement('p')
      nameP.textContent = trainer.name
      cardDiv.appendChild(nameP)
      // Add "add" button
      const addBtn = document.createElement('button')
      addBtn.dataset.trainerId = trainer.id
      addBtn.innerText = "Add Pokemon"
      cardDiv.appendChild(addBtn)
      // Create UL
      const pokeUl = document.createElement('ul') 
      trainer.pokemons.forEach(poke => {addPokeToList(poke, pokeUl)})
      cardDiv.appendChild(pokeUl)
      main.appendChild(cardDiv)
      addAddButtonEventListener(addBtn, pokeUl)
    });
  }

  function addReleaseButtonEventListener(button, pokeLi) {
    button.addEventListener("click", (e) => {
      console.log(`hit: ${button.dataset.pokemonId}`)
      configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
      fetch(`${POKEMONS_URL}/${button.dataset.pokemonId}`, configObj)
      .then(resp => resp.json())
      .then(data => pokeLi.remove())
      .catch(console.log)
    })
  }

  function addAddButtonEventListener(button, pokeUl) {
    button.addEventListener("click", (e) => {
      console.log(`hit: ${button.dataset.trainerId}`)
      if(pokeUl.querySelectorAll('li').length < 6){
      configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({'trainer_id': button.dataset.trainerId})
      }
      fetch(`${POKEMONS_URL}`, configObj)
      .then(resp => resp.json())
      .then(data =>{
        addPokeToList(data, pokeUl)
      })
      .catch(console.log)
    } else {
      alert("That's too many Pokemon")
    }
    })
  }

  function addPokeToList(poke, pokeUl) {
    console.log(`hit: ${pokeUl}`)
    const pokeLi = document.createElement('li')
        pokeLi.textContent = `${poke.nickname} (${poke.species})`
        // Add Release Button
        const releaseBtn = document.createElement('button')
        releaseBtn.className = 'release'
        releaseBtn.dataset.pokemonId = poke.id
        releaseBtn.innerText = "Release"
        addReleaseButtonEventListener(releaseBtn, pokeLi)
        pokeLi.appendChild(releaseBtn)
        pokeUl.appendChild(pokeLi)
  }

});

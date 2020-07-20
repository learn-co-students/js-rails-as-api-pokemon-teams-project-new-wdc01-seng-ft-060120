document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000'
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    const fetchTrainers = () => {
        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(data => renderAll(data))
            .catch(err => console.log(err))
    }

    const renderAll = data => {
        data.forEach(trainer => renderTrainer(trainer))
    }

    const renderTrainer = trainer => {
        const mainContainer = document.querySelector('main')
        const div = document.createElement('div')

        div.classList = 'card'
        div.dataset.id = trainer.id
        mainContainer.appendChild(div)

        const p = document.createElement('p')
        p.textContent = trainer.name
        div.appendChild(p)

        const button = document.createElement('button')
        button.dataset.trainerId = trainer.id
        button.textContent = 'Add Pokemon'
        div.appendChild(button)

        renderPokemons(trainer.pokemons, div)
    }

    const renderPokemons = (pokemons, div) => {
        const ul = document.createElement('ul')

        pokemons.forEach(pokemon => {
            const li = document.createElement('li')
            li.textContent = `${pokemon.nickname} (${pokemon.species}) `

            const button = document.createElement('button')
            button.className = 'release'
            button.dataset.pokemonId = pokemon.id
            button.textContent = 'Release'
            li.appendChild(button)

            ul.appendChild(li)
        })
        div.appendChild(ul)
    }

    fetchTrainers()
    // fetchPokemon()
})

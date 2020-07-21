document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000'
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    // Create Trainer Cards
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
        button.classList = 'add'
        button.textContent = 'Add Pokemon'
        div.appendChild(button)

        renderPokemons(trainer.pokemons, div)
    }

    const renderPokemons = (pokemons, div) => {
        const ul = document.createElement('ul')
        div.appendChild(ul)

        pokemons.forEach(pokemon => {
            renderOnePokemon(pokemon, ul)
        })
    }

    const renderOnePokemon = (pokemon, ul) => {
        const li = document.createElement('li')
        li.textContent = `${pokemon.nickname} (${pokemon.species}) `

        const button = document.createElement('button')
        button.className = 'release'
        button.dataset.pokemonId = pokemon.id
        button.textContent = 'Release'
        li.appendChild(button)

        ul.appendChild(li)
    }

    // Add a new Pokemon

    const handleButtons = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.add')) {
                if (e.target.nextElementSibling.children.length == 6) {
                    alert('Team is Full')
                } else {
                    addPokemon(e.target)
                }
            }
            if (e.target.matches('.release')) {
                // console.log(e.target)
                removePokemon(e.target)
            }
        })
    }

    // if team is full dont do a request

    const addPokemon = addButton => {
        const trainerId = addButton.dataset.trainerId

        const configurationObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                trainer_id: trainerId,
            }),
        }

        fetch(POKEMONS_URL, configurationObject)
            .then(resp => resp.json())
            .then(data => {
                console.log('post request sent')
                renderOnePokemon(data, addButton.nextElementSibling)
            })
    }

    const removePokemon = releaseButton => {
        const pokemonId = releaseButton.dataset.pokemonId

        fetch(POKEMONS_URL + '/' + pokemonId, { method: 'DELETE' })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                removePokemonFromDOM(data)
            })
    }

    const removePokemonFromDOM = data => {
        const liToDelete = document.querySelector(`button[data-pokemon-id = "${data.id}"]`)
        liToDelete.parentElement.remove()
        console.log(liToDelete.parentElement)
    }

    fetchTrainers()
    handleButtons()
})

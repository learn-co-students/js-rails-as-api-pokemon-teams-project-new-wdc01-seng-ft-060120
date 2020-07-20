class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
    
        render json: trainers, include: :pokemons
    end

    def show
        trainer = Trainer.find(params[:id])
        pokemon = trainer.pokemons

        render json: {
            trainer: trainer, 
            pokemon: pokemon
        }
    end
end

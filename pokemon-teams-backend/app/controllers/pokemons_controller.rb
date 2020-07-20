class PokemonsController < ApplicationController

  def create
    pokemon = Pokemon.new
    pokemon.trainer = Trainer.find(params[:trainer_id])
    pokemon.generate_names
    pokemon.save
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: {}
  end
end

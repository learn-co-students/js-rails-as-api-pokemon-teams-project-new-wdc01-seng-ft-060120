class Pokemon < ApplicationRecord
  belongs_to :trainer

  def generate_names 
    self.nickname = Faker::Name.first_name
    self.species = Faker::Games::Pokemon.name
  end
end

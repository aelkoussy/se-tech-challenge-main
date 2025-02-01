# spec/factories/suppliers.rb
FactoryBot.define do
  factory :supplier do
    name { Faker::Company.name } # Generates a random company name
    address { Faker::Address.street_address } # Generates a random street address
    zip { Faker::Address.zip_code } # Generates a random zip code
    city { Faker::Address.city } # Generates a random city name
    country { Faker::Address.country } # Generates a random country name
  end
end

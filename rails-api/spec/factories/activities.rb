# spec/factories/activities.rb
FactoryBot.define do
  factory :activity do
    title { Faker::Lorem.sentence(word_count: 5) } # Generates a random title
    price { Faker::Commerce.price(range: 10..200.0) } # Generates a random price between 10 and 200
    currency { "$" } # Assuming a fixed currency for simplicity
    rating { Faker::Number.between(from: 0.0, to: 5.0) } # Generates a random rating between 0.0 and 5.0
    special_offer { Faker::Boolean.boolean } # Randomly true or false
    supplier_id { association(:supplier).id } # Links to a supplier created by the supplier factory
  end
end

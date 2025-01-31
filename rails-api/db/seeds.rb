# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "json"

# Helper method to load JSON data
def load_json(file_name)
  file_path = Rails.root.join("db", "seeds", file_name)
  JSON.parse(File.read(file_path))
end

# Seeding Suppliers
puts "Seeding Suppliers..."
suppliers_data = load_json("suppliers.json")

suppliers_data.each do |supplier_data|
  Supplier.find_or_create_by!(id: supplier_data["id"]) do |supplier|
    supplier.name = supplier_data["name"]
    supplier.address = supplier_data["address"]
    supplier.zip = supplier_data["zip"]
    supplier.city = supplier_data["city"]
    supplier.country = supplier_data["country"]
  end
end
puts "Seeded #{Supplier.count} suppliers."

# Seeding Activities
puts "Seeding Activities..."
activities_data = load_json("activities.json")

activities_data.each do |activity_data|
  Activity.create!(
    title: activity_data["title"],
    price: activity_data["price"],
    currency: activity_data["currency"],
    rating: activity_data["rating"],
    special_offer: activity_data["specialOffer"],
    supplier_id: activity_data["supplierId"]
  )
end
puts "Seeded #{Activity.count} activities."

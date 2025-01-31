class Activity < ApplicationRecord
  belongs_to :supplier

  validates :title, :price, :currency, presence: true
  validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
end

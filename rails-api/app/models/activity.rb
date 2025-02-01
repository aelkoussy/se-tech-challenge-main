class Activity < ApplicationRecord
  include MeiliSearch::Rails
  belongs_to :supplier

  validates :title, :price, :currency, presence: true
  validates :rating,
            numericality: {
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 5
            }

  meilisearch do
    # all attributes will be sent to Meilisearch if block is left empty
    displayed_attributes %i[title price currency rating specialOffer]
    searchable_attributes %i[title price currency rating]
    filterable_attributes [:specialOffer]
  end
end

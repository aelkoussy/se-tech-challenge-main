class Activity < ApplicationRecord
  include MeiliSearch::Rails

  meilisearch do
    # all attributes will be sent to Meilisearch if block is left empty
    attributes %i[title price currency rating special_offer]
  end

  belongs_to :supplier

  validates :title, :price, :currency, presence: true
  validates :rating,
            numericality: {
              greater_than_or_equal_to: 0,
              less_than_or_equal_to: 5
            }
end

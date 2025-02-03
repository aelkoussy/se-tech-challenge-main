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
    # as of now, the only useful thing to index is title since we only search that
    # but in the future we might want to index more stuff like price, currency, rating, special_offer, supplier_id
    # this enables us to filter by more things
    attributes %i[title price currency rating special_offer]
  end
end

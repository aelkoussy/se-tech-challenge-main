class Supplier < ApplicationRecord
  include MeiliSearch::Rails
  has_many :activities, dependent: :destroy

  validates :name, presence: true

  meilisearch do
    # all attributes will be sent to Meilisearch if block is left empty
    displayed_attributes %i[name address zip city country]
    searchable_attributes %i[name address zip city country]
    filterable_attributes %i[name address zip city country]
  end
end

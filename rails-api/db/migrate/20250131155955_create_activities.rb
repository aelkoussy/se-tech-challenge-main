class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.string :title, null: false
      # the precision below is a sensible default for monetary values, we can adjust it if it makes sense based on expected values
      t.decimal :price, precision: 10, scale: 2, null: false
      t.string :currency, null: false, default: "$"
      t.float :rating, default: 0.0
      t.boolean :special_offer, default: false
      t.references :supplier, null: false, foreign_key: true

      t.timestamps
    end
  end
end

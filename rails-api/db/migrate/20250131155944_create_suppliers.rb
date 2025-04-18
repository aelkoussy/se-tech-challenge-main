class CreateSuppliers < ActiveRecord::Migration[7.0]
  def change
    create_table :suppliers do |t|
      t.string :name, null: false
      t.string :address
      t.string :zip
      t.string :city
      t.string :country

      t.timestamps
    end
  end
end

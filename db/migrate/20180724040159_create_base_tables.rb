class CreateBaseTables < ActiveRecord::Migration[5.1]
  def change
    create_table :estates do |t|
      t.string  :name, null: false
      t.decimal :longitude, precision: 9, scale: 6
      t.decimal :latitude,  precision: 9, scale: 6
      t.integer :price
      t.string  :address

      t.timestamps
    end
  end
end

class CreateBaseTables < ActiveRecord::Migration[5.1]
  def change
    create_table :estates do |t|
      t.string  :name, null: false
      t.decimal :longitude, precision: 9, scale: 6, null: false
      t.decimal :latitude,  precision: 9, scale: 6, null: false
      t.decimal :price, precision: 4, scale: 1
      t.string  :address
      t.string  :location1
      t.string  :location2
      t.string  :location3
      t.integer :year
      t.string  :height
      t.string  :floor
      t.string  :administration_fee
      t.string  :amortization
      t.string  :floor_plan
      t.string  :area
      t.string  :note

      t.timestamps
    end
  end
end

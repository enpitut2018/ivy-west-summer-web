class CreateBaseTables < ActiveRecord::Migration[5.1]
  def change
    create_table :estates do |t|
      # 不動産基本情報
      t.string  :name, null: false
      t.decimal :latitude,  precision: 9, scale: 6, null: false
      t.decimal :longitude, precision: 9, scale: 6, null: false
      t.decimal :price, precision: 4, scale: 1
      t.string  :address
      t.integer :years
      t.string  :floor_plan
      t.string  :location1
      t.string  :location2
      t.string  :location3
      t.integer :height
      t.integer :floor
      t.string  :administration_fee
      t.decimal :deposit, precision: 4, scale: 1
      t.decimal :gratuity_fee, precision: 4, scale: 1
      t.decimal :occupied_area, precision: 6, scale: 2
      t.text  :note
      # 治安情報
      t.integer :noise

      t.timestamps
    end
  end
end

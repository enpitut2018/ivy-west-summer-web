# == Schema Information
#
# Table name: estates
#
#  id                 :bigint(8)        not null, primary key
#  name               :string           not null
#  latitude           :decimal(9, 6)    not null
#  longitude          :decimal(9, 6)    not null
#  price              :decimal(4, 1)
#  address            :string
#  years              :integer
#  floor_plan         :string
#  location1          :string
#  location2          :string
#  location3          :string
#  height             :integer
#  floor              :integer
#  administration_fee :string
#  deposit            :decimal(4, 1)
#  gratuity_fee       :decimal(4, 1)
#  occupied_area      :decimal(6, 2)
#  note               :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Estate < ApplicationRecord
  validates :name,      presence: true
  validates :longitude, presence: true
  validates :latitude,  presence: true
end

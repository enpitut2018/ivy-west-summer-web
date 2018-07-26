# == Schema Information
#
# Table name: estates
#
#  id                 :bigint(8)        not null, primary key
#  name               :string           not null
#  longitude          :decimal(9, 6)    not null
#  latitude           :decimal(9, 6)    not null
#  price              :decimal(4, 1)
#  address            :string
#  location1          :string
#  location2          :string
#  location3          :string
#  year               :integer
#  height             :string
#  floor              :string
#  administration_fee :string
#  amortization       :string
#  floor_plan         :string
#  area               :string
#  note               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Estate < ApplicationRecord
  validates :name,      presence: true
  validates :longitude, presence: true
  validates :latitude,  presence: true
end

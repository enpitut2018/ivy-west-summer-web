# == Schema Information
#
# Table name: estates
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  longitude  :decimal(9, 6)
#  latitude   :decimal(9, 6)
#  price      :integer
#  address    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Estate < ApplicationRecord
  validates :name,      presence: true
  validates :longitude, presence: true
  validates :latitude,  presence: true
end

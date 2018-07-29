safe_sum = 0
data_num = 0
if estate.noise.present?
  safe_sum += estate.noise
  data_num += 1
end
if estate.izakaya.present?
  safe_sum += estate.izakaya
  data_num += 1
end
if estate.crime.present?
  safe_sum += estate.crime
  data_num += 1
end
safe_level_ave = safe_sum.to_f / data_num
safe_level = nil
if safe_level_ave <= 3
  safe_level = 1
elsif 3 < safe_level_ave && safe_level_ave < 6
  safe_level = 2
elsif 6 <= safe_level_ave
  safe_level = 3
end

json.id                 estate.id
json.name               estate.name
json.latitude           estate.latitude
json.longitude          estate.longitude
json.price              estate.price
json.address            estate.address
json.years              estate.years
json.floor_plan         estate.floor_plan
json.location1          estate.location1
json.location2          estate.location2
json.location3          estate.location3
json.height             estate.height
json.floor              estate.floor
json.administration_fee estate.administration_fee
json.deposit            estate.deposit
json.gratuity_fee       estate.gratuity_fee
json.occupied_area      estate.occupied_area
json.url                estate.url
json.noise              estate.noise
json.izakaya            estate.izakaya
json.crime              estate.crime
json.safe_level         safe_level
json.note               estate.note
json.created_at         estate.created_at
json.updated_at         estate.updated_at

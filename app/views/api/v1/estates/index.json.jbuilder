json.array! @estates do |estate|
  json.id         estate.id
  json.name       estate.name
  json.longitude  estate.longitude
  json.latitude   estate.latitude
  json.price      estate.price
  json.address    estate.address
  json.yaer       estate.year
  json.floor_plan estate.floor_plan
end

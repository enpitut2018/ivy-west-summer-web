# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 不動産情報サンプル
Estate.create([
  {
    name: 'グリーンハイツ',
    longitude: 36.112727,
    latitude: 140.097682,
    price: 30000,
    address: '茨城県つくば市松代2丁目6−9'
  }, {
    name: 'KAさくら',
    longitude: 36.115105,
    latitude: 140.107639,
    price: 30000,
    address: '茨城県つくば市桜2丁目23−1'
  }, {
    name: 'ハイライズさくら',
    longitude: 36.112727,
    latitude: 140.097682,
    price: 30000,
    address: '茨城県つくば市桜1丁目5−9'
  }, {
    name: 'サンプル不動産1',
    longitude: 36.1119215,
    latitude: 140.096918,
    price: 50000,
    address: 'サンプル住所1'
  }, {
    name: 'サンプル不動産2',
    longitude: 36.112749,
    latitude: 140.099848,
    price: 40000,
    address: 'サンプル住所2'
  }
])

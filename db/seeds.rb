# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 管理人ユーザ
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

# 不動産情報サンプル
Estate.create([
  {
    name: 'グリーンハイツ',
    latitude: 36.100000,
    longitude: 140.097682,
    price: 3.0,
    address: '茨城県つくば市松代2丁目6−9',
    years: 10,
    floor_plan: '1K'
  }, {
    name: 'KAさくら',
    latitude: 36.115105,
    longitude: 140.107639,
    price: 3.5,
    address: '茨城県つくば市桜2丁目23−1',
    years: 15,
    floor_plan: '1K'
  }, {
    name: 'ハイライズさくら',
    latitude: 36.112727,
    longitude: 140.097682,
    price: 4.0,
    address: '茨城県つくば市桜1丁目5−9',
    years: 20,
    floor_plan: '1K'
  }, {
    name: 'サンプル不動産1',
    latitude: 36.1119215,
    longitude: 140.096918,
    price: 4.5,
    address: 'サンプル住所1',
    years: 25,
    floor_plan: '1LDK'
  }, {
    name: 'サンプル不動産2',
    latitude: 36.112749,
    longitude: 140.099848,
    price: 5.0,
    address: 'サンプル住所2',
    years: 30,
    floor_plan: '2LDK'
  }
])

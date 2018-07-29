require_relative '../../lib/module/noise_level_module.rb'
include NoiseLevel

ActiveAdmin.register Estate do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

  area_crime_level = {
    azuma: 43,
    amakubo: 52,
    gakuenno_mori: 18,
    kasuga: 36,
    kaname: 1,
    kurihara: 5,
    kenkyuu_gakuen: 47,
    sakura: 10,
    shibasaki: 4,
    tsumaki: 4,
    tennoudai: 16,
    hanabatake: 10,
    higashi_hiratsuka: 3
  }

  active_admin_importable do |model, hash|
    # 騒音レベルの計算
    noise = NoiseLevel.get_noise_level(hash[:latitude].to_f, hash[:longitude].to_f)
    # 居酒屋レベルの計算
    izakaya = hash[:izakaya].to_f / 3
    if izakaya == 0
      izakaya = 1
    elsif izakaya >= 9.6
      izakaya = 10
    end
    izakaya = izakaya.to_i
    # 犯罪レベルの計算
    address = hash[:address].force_encoding('UTF-8')
    crime_num = nil
    if address.match(/吾妻/)
      crime_num = area_crime_level[:azuma]
    elsif address.match(/天久保/)
      crime_num = area_crime_level[:amakubo]
    elsif address.match(/学園の森/)
      crime_num = area_crime_level[:gakuenno_mori]
    elsif address.match(/春日/)
      crime_num = area_crime_level[:kasuga]
    elsif address.match(/要/)
      crime_num = area_crime_level[:kaname]
    elsif address.match(/栗原/)
      crime_num = area_crime_level[:kurihara]
    elsif address.match(/研究学園/)
      crime_num = area_crime_level[:kenkyuu_gakuen]
    elsif address.match(/桜/)
      crime_num = area_crime_level[:sakura]
    elsif address.match(/柴崎/)
      crime_num = area_crime_level[:shibasaki]
    elsif address.match(/妻木/)
      crime_num = area_crime_level[:tsumaki]
    elsif address.match(/天王台/)
      crime_num = area_crime_level[:tennoudai]
    elsif address.match(/花畑/)
      crime_num = area_crime_level[:hanabatake]
    elsif address.match(/東平塚/)
      crime_num = area_crime_level[:higashi_hiratsuka]
    end
    crime = crime_num.to_f / 5
    if crime == 0
      crime = 1
    elsif crime > 9.6
      crime = 10
    end
    crime.to_i

    # 各項目の入力
    latitude = hash[:latitude].present? ? hash[:latitude].to_f : nil
    longitude = hash[:longitude].present? ? hash[:longitude].to_f : nil
    years = hash[:years].present? ? hash[:years].force_encoding('UTF-8').gsub('築', '').gsub('年', '').to_i : nil
    height = hash[:height].present? ? hash[:height].force_encoding('UTF-8').gsub('階建', '').to_i : nil
    administration_fee = nil
    unless hash[:administration_fee] == '-'
      administration_fee = hash[:administration_fee].force_encoding('UTF-8').gsub('円', '').to_i
    end
    deposit = nil
    unless hash[:dep_gra].force_encoding('UTF-8').split('/')[0] == '-'
      deposit = hash[:dep_gra].force_encoding('UTF-8').gsub('万円', '').split('/')[0].to_f
    end
    gratuity_fee = nil
    unless hash[:dep_gra].force_encoding('UTF-8').split('/')[1] == '-'
      gratuity_fee = hash[:dep_gra].force_encoding('UTF-8').gsub('万円', '').split('/')[1].to_f
    end

    # データ作成
    model.create(
      name:               hash[:name],
      latitude:           latitude,
      longitude:          longitude,
      price:              hash[:price].force_encoding('UTF-8').gsub('万円', '').to_f,
      address:            hash[:address],
      years:              years,
      floor_plan:         hash[:floor_plan],
      location1:          hash[:location1],
      location2:          hash[:location2],
      location3:          hash[:location3],
      height:             height,
      floor:              hash[:floor].force_encoding('UTF-8').gsub('階', '').to_i,
      administration_fee: administration_fee,
      deposit:            deposit,
      gratuity_fee:       gratuity_fee,
      occupied_area:      hash[:occupied_area].force_encoding('UTF-8').gsub('m', '').to_f,
      url:                hash[:url],
      noise:              noise,
      izakaya:            izakaya,
      crime:              crime,
      note:               hash[:note]
    )
  end
end

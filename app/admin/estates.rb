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
  active_admin_importable do |model, hash|
    noise = NoiseLevel.get_noise_level(hash[:latitude].to_f, hash[:longitude].to_f)
    model.create(
      name:               hash[:name],
      latitude:           hash[:latitude].to_f,
      longitude:          hash[:longitude].to_f,
      price:              hash[:price].force_encoding('UTF-8').gsub('万円', '').to_f,
      address:            hash[:address],
      years:              hash[:years].force_encoding('UTF-8').gsub('築', '').gsub('年', '').to_i,
      floor_plan:         hash[:floor_plan],
      location1:          hash[:location1],
      location2:          hash[:location2],
      location3:          hash[:location3],
      height:             hash[:height].force_encoding('UTF-8').gsub('階建', '').to_i,
      floor:              hash[:floor].force_encoding('UTF-8').gsub('階', '').to_i,
      administration_fee: hash[:administration_fee].force_encoding('UTF-8').gsub('円', '').to_i,
      deposit:            hash[:dep_gra].force_encoding('UTF-8').gsub('万円', '').split('/')[0].to_f,
      gratuity_fee:       hash[:dep_gra].force_encoding('UTF-8').gsub('万円', '').split('/')[1].to_f,
      occupied_area:      hash[:occupied_area].force_encoding('UTF-8').gsub('m', '').to_f,
      noise:              noise,
      note:               hash[:note]
    )
  end
end

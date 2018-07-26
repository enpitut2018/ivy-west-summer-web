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
    model.create(
      name:               hash[:name],
      longitude:          0.000000, # @TODO 後で入力
      latitude:           0.000000, # @TODO 後で入力
      price:              hash[:price],
      address:            hash[:address],
      location1:          hash[:location1],
      location2:          hash[:location2],
      location3:          hash[:location3],
      year:               hash[:year].gsub(/[^\d]/, '').to_i,
      height:             hash[:height],
      floor:              hash[:floor],
      administration_fee: hash[:administration_fee],
      note:               hash[:note],
      floor_plan:         hash[:floor_plan],
      area:               hash[:area]
    )
  end
end

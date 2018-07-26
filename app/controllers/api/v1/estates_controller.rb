class Api::V1::EstatesController < ApplicationController
  def index
    one = Estate.all

    one = one.where('estates.address LIKE ?', '%' + params[:address] + '%') if params[:address].present?

    if params[:upper_price].present?
      one = one.where(price: -Float::INFINITY..params[:upper_price].to_f)
    end

    if params[:lower_price].present?
      one = one.where(price: params[:lower_price].to_f..Float::INFINITY)
    end

    if params[:distance].present?
      # @TODO 後で実装する
    end

    if params[:years].present?
      one = one.where(year: 0..params[:years].to_i)
    end

    if params[:room_layout].present?
      one = one.where('estates.floor_plan LIKE ?', '%' + params[:room_layout] + '%')
    end

    # distance=10&years=10&room-layout=1K

    @estates = one

    render 'index', formats: 'json', handlers: 'jbuilder'
  end

  def show
    @estate = Estate.find_by_name(params[:name])
  end
end

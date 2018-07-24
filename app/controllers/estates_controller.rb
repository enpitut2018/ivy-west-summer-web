class EstatesController < ApplicationController
  def index
  end

  def new
    @estate = Estate.new
  end

  def create
    estate = Estate.new(estate_params)
    estate.save
  end

  def all
    @estates = Estate.all

    render 'all', formats: 'json', handlers: 'jbuilder'
  end

  private

  def estate_params
    params.require(:estate).permit(:name, :longitude, :latitude, :price, :address)
  end
end

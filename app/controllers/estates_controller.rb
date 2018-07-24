class EstatesController < ApplicationController
  def index
    @estates = Estate.all
  end

  def new
    @estate = Estate.new
  end

  def create
    estate = Estate.new(estate_params)
    estate.save
    redirect_to estates_path
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

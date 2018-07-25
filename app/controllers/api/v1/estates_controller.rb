class Api::V1::EstatesController < ApplicationController
  def index
    @estates = Estate.all
    render 'index', formats: 'json', handlers: 'jbuilder'
  end

  def show
    @estate = Estate.find_by_name(params[:name])
  end
end

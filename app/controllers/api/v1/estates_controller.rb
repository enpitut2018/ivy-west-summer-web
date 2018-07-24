class Api::V1::EstatesController < ApplicationController
  def index
    @estates = Estate.all
    render 'index', formats: 'json', handlers: 'jbuilder'
  end
end

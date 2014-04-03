class StoresController < ApplicationController
  def index
    @stores = Store.all
    respond_to do |format|
      format.json { render json: @stores.to_json }
    end
  end

end

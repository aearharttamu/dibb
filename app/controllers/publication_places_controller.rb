class PublicationPlacesController < ApplicationController
  
  before_action :set_publication_place, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /biblios.json
  def index
    @publication_places = PublicationPlace.list(params[:biblio_id])
    render json: @publication_places.to_json
  end

  # GET /biblios/1.json
  def show
    render json: @publication_place.obj.to_json
  end

  # POST /biblios.json
  def create
    @publication_place = PublicationPlace.new(publication_place_params)

    if @publication_place.save
      render json: @publication_place.obj
    else
      render json: @publication_place.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /biblios/1.json
  def update
    if @publication_place.update(publication_place_params)
      render json: @publication_place.obj
    else
      render json: @publication_place.errors, status: :unprocessable_entity
    end
  end

  # DELETE /biblios/1.json
  def destroy
    if @publication_place.destroy
      head :no_content
    else
      render json: @publication_place.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_publication_place
      @publication_place = PublicationPlace.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def publication_place_params
      params.require(:publication_place).permit(:biblio_id, :city, :country, :state)
    end
end

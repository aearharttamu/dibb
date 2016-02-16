class BibliosController < ApplicationController
  before_action :set_biblio, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /biblios.json
  def index
    @biblios = Biblio.list(params[:biblio_set_id])
    render json: @biblios.to_json
  end

  # GET /biblios/1.json
  def show
    render json: @biblio.obj.to_json
  end

  # POST /biblios.json
  def create
    @biblio = Biblio.new(biblio_params)

    if @biblio.save
      render json: @biblio.obj
    else
      render json: @biblio.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /biblios/1.json
  def update    
    if @biblio.update(biblio_params)
      render json: @biblio.obj
    else
      render json: @biblio.errors, status: :unprocessable_entity
    end
  end

  # DELETE /biblios/1.json
  def destroy
    if @biblio.destroy
      head :no_content
    else
      render json: @biblio.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_biblio
      @biblio = Biblio.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def biblio_params
      params.permit(:id, :biblio_set_id, :item_as_appears, :item_number, :title, :descriptors, :date_as_appears, :year, :publisher_id, :provenance, :pub_number, :size, :binding, :pagination, :unnumbered_pages, :contents, :category_as_appears, publication_places_json: [:id, :city, :state, :country] )
    end
end
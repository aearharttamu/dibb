class BiblioSetsController < ApplicationController
  before_action :set_biblio_set, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /biblio_sets.json
  def index
    @biblio_sets = BiblioSet.list_all
    render json: @biblio_sets.to_json
  end

  # GET /biblio_sets/1.json
  def show
    render json: @biblio_set.obj.to_json
  end

  # POST /biblio_sets.json
  def create
    @biblio_set = BiblioSet.new(biblio_set_params)

    if @biblio_set.save
      render json: @biblio_set.obj
    else
      render json: @biblio_set.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /biblio_sets/1.json
  def update
    if @biblio_set.update(biblio_set_params)
      render json: @biblio_set.obj
    else
      render json: @biblio_set.errors, status: :unprocessable_entity
    end
  end

  # DELETE /biblio_sets/1.json
  def destroy
    if @biblio_set.destroy
      head :no_content
    else
      render json: @biblio_set.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_biblio_set
      @biblio_set = BiblioSet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def biblio_set_params
      params.require(:biblio_set).permit(:title, :genre, :other_genre, :items)
    end
end

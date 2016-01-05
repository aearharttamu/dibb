class BibliographsController < ApplicationController
  before_action :set_bibliograph, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /bilbiographs.json
  def index
    @bibliographs = Bibliograph.list_all
    render json: @bibliographs.to_json
  end

  # GET /bilbiographs/1.json
  def show
    render json: @bibliograph.obj.to_json
  end

  # POST /bilbiographs.json
  def create
    @bibliograph = Biblio.new(bibliograph_params)

    if @bibliograph.save
      render json: @bibliograph.obj
    else
      render json: @bibliograph.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bilbiographs/1.json
  def update
    if @bibliograph.update(bibliograph_params)
      render json: @bibliograph.obj
    else
      render json: @bibliograph.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bilbiographs/1.json
  def destroy
    if @bibliograph.destroy
      head :no_content
    else
      render json: @bibliograph.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bibliograph
      @bibliograph = Bibliograph.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bibliograph_params
      params.require(:biblio).permit( :name )
    end
end

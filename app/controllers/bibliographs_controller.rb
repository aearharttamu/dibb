class BibliographsController < ApplicationController
  before_action :set_bibliograph, only: [:show, :destroy]
  before_action :authenticate_user!
  before_action :admin_only

  # GET /bibliographs.json
  def index
    @bibliographs = Bibliograph.list_all
    render json: @bibliographs.to_json
  end

  # GET /bibliographs/1.json
  def show
    render json: @bibliograph.obj.to_json
  end

  # POST /bibliographs.json
  def create
    @bibliograph = Bibliograph.new(bibliograph_params)
    @bibliograph.user = current_user

    if @bibliograph.save
      
      # create the Neo4j graph in the background
      @bibliograph.delay.create_neo_graph()
      
      render json: @bibliograph.obj
    else
      render json: @bibliograph.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bibliographs/1.json
  def destroy    
    # remove the Neo4j graph in the background
    @bibliograph.delay.remove_neo_graph()
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bibliograph
      @bibliograph = Bibliograph.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bibliograph_params
      params.require(:bibliograph).permit( :name )
    end
end

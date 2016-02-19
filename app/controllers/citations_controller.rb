class CitationsController < ApplicationController
  before_action :set_citation, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /citations.json
  def index
    @citations = Citation.get_all(params[:biblio_id])
    render json: @citations
  end

  # GET /citations/1.json
  def show
    render json: @citation.obj
  end

  # POST /citations.json
  def create
    @citation = Citation.new(citation_params)
    @citation.biblio_id = params[:biblio_id]

    if @citation.save
      render json: @citation.obj
    else
      render json: @citation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /citations/1.json
  def update
    if @citation.update(citation_params)
      render json: @citation.obj
    else
      render json: @citation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /citations/1.json
  def destroy
    if @citation.destroy
      head :no_content
    else
      render json: @citation.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_citation
      @citation = Citation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def citation_params
      params.permit(:id, :title_id, :title_name, :full_text, :page_number, :page_number_sequence_id, :originating_page_number_as_appears, :ending_page_number_as_appears, :category_id, :notes )
    end

end
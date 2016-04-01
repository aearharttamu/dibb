class PageNumSequencesController < ApplicationController
  before_action :set_page_num_sequences, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /page_num_sequences.json
  def index
    @page_num_sequences = PageNumSequence.get_all(params[:biblio_id])
    render json: @page_num_sequences
  end

  # GET /page_num_sequences/1.json
  def show
    render json: @page_num_sequence.obj
  end

  # POST /page_num_sequences.json
  def create
    @page_num_sequence = PageNumSequence.new(page_num_sequence_params)
    @page_num_sequence.biblio_id = params[:biblio_id]

    if @page_num_sequence.save
      render json: @page_num_sequence.obj
    else
      render json: @page_num_sequence.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /page_num_sequences/1.json
  def update
    if @page_num_sequence.update(page_num_sequence_params)
      render json: @page_num_sequence.obj
    else
      render json: @page_num_sequence.errors, status: :unprocessable_entity
    end
  end

  # DELETE /page_num_sequences/1.json
  def destroy
    if @page_num_sequence.destroy
      head :no_content
    else
      render json: @page_num_sequence.errors, status: :not_destroyed
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_page_num_sequences
    @page_num_sequence = PageNumSequence.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def page_num_sequence_params
    params.permit(:id, :biblio_id, :first_page_number_as_appears, :first_page_number, :final_page_number_as_appears, :final_page_number )
  end

end
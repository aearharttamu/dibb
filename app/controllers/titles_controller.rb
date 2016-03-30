class TitlesController < ApplicationController
  before_action :set_title, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :admin_only, only: [:destroy]

  # GET /titles.json
  def index
    @titles = Title.get_all
    render json: @titles.to_json
  end

  # GET /titles/1.json
  def show
    render json: @title.obj.to_json
  end

  # POST /titles.json
  def create
    @title = Title.new(title_params)

    if @title.save
      render json: @title.obj
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /titles/1.json
  def update
    if @title.update(title_params)
      render json: @title.obj
    else
      render json: @title.errors, status: :unprocessable_entity
    end
  end

  # DELETE /titles/1.json
  def destroy
    if @title.destroy
      head :no_content
    else
      render json: @title.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_title
      @title = Title.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def title_params
      params.permit( :name, :is_review, :review_full_text, :serial_title, :serial_volume_as_appears, :serial_issue_as_appears, :encompassing_title_id, staff_json: [:id, :person_id, :role_id, :new_person_name ] , binding_json: [:id, :format_id, :currency_id, :price, :title_id])
    end
end

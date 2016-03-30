class FormatsController < ApplicationController
  before_action :set_format, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :admin_only, only: [:destroy]

  # GET /formats.json
  def index
    @formats = Format.get_all
    render json: @formats.to_json
  end

  # GET /formats/1.json
  def show
    render json: @format.obj.to_json
  end

  # POST /formats.json
  def create
    @format = Format.new(format_params)

    if @format.save
      render json: @format.obj
    else
      render json: @format.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /formats/1.json
  def update
    if @format.update(format_params)
      render json: @format.obj
    else
      render json: @format.errors, status: :unprocessable_entity
    end
  end

  # DELETE /formats/1.json
  def destroy
    if @format.destroy
      head :no_content
    else
      render json: @format.errors, status: :not_destroyed
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_format
    @format = Format.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def format_params
    params.require(:format).permit(:name)
  end
end

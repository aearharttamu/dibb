class BindingsController < ApplicationController
  before_action :set_binding, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :admin_only, only: [:destroy]

  # GET /bindings.json
  def index
    @bindings = Edition.get_all
    render json: @bindings.to_json
  end

  # GET /bindings/1.json
  def show
    render json: @binding.obj.to_json
  end

  # POST /bindings.json
  def create
    @binding = Edition.new(binding_params)

    if @binding.save
      render json: @binding.obj
    else
      render json: @binding.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bindings/1.json
  def update
    if @binding.update(binding_params)
      render json: @binding.obj
    else
      render json: @binding.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bindings/1.json
  def destroy
    if @binding.destroy
      head :no_content
    else
      render json: @binding.errors, status: :not_destroyed
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_binding
    @binding = Edition.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def binding_params
    params.require(:binding).permit(:name)
  end
end

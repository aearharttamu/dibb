class RolesController < ApplicationController
  before_action :set_role, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :admin_only, only: [:destroy]

  # GET /roles.json
  def index
    @roles = Role.get_all
    render json: @roles.to_json
  end

  # GET /roles/1.json
  def show
    render json: @role.obj.to_json
  end

  # POST /roles.json
  def create
    @role = Role.new(role_params)

    if @role.save
      render json: @role.obj
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /roles/1.json
  def update
    if @role.update(role_params)
      render json: @role.obj
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /roles/1.json
  def destroy
    if @role.destroy
      head :no_content
    else
      render json: @role.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_role
      @role = Role.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def role_params
      params.require(:role).permit(:name)
    end
end

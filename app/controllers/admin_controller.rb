class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :admin_only
  before_action :set_user, only: [:show, :edit, :update]

  # GET /users.json
  def index
    @users = User.get_all()
    render json: @users
  end

  # GET /users/1.json
  def show
    render json: @user.obj
  end

  # POST /users.json
  def create
    @user = User.new(user_params)

    if @citation.save
      render json: @user.obj
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render json: @user.obj
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.permit( :email, :admin, :enabled )
    end

end
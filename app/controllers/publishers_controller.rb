class PublishersController < ApplicationController
  before_action :set_publisher, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /publishers.json
  def index
    @publishers = Publisher.get_all
    render json: @publishers.to_json
  end

  # GET /publishers/1.json
  def show
    render json: @publisher.obj.to_json
  end

  # POST /publishers.json
  def create
    @publisher = Publisher.new(publisher_params)

    if @publisher.save
      render json: @publisher.obj
    else
      render json: @publisher.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /publishers/1.json
  def update
    if @publisher.update(publisher_params)
      render json: @publisher.obj
    else
      render json: @publisher.errors, status: :unprocessable_entity
    end
  end

  # DELETE /publishers/1.json
  def destroy
    if @publisher.destroy
      head :no_content
    else
      render json: @publisher.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_publisher
      @publisher = Publisher.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def publisher_params
      params.require(:publisher).permit(:name)
    end
end

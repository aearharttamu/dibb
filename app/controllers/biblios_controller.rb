class BibliosController < ApplicationController

  before_action :authenticate_user!

  def index    
    @biblios = Biblio.list_all
    render json: @biblios.to_json
  end
  
  def show
    @biblio = Biblio.find(biblio_params[:id])
    render json: @biblio.obj.to_json
  end
  
  def create
    @biblio = Biblio.new(biblio_params)

    if @biblio.save
      render json: @biblio.obj
    else
      render json: @biblio.errors, status: :unprocessable_entity 
    end
  end
  
  def update
    @biblio = Biblio.find(params[:id])
    if @biblio.update(biblio_params)
      render json: @biblio.obj
    else
      render json: @biblio.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @biblio = Biblio.find(params[:id])
    if @biblio.destroy
      head :no_content
    else
      render json: @biblio.errors, status: :not_destroyed
    end
  end
  
  private
  
  def biblio_params
    params.permit(:id, :title, :genre, :date, :provenance, :pubnumber )
  end

end

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
    
  end
  
  def update
    
  end
  
  def destroy
    
  end
  
  private
  
  def biblio_params
    params.permit(:id, :title, :genre, :date, :provenance, :pubnumber )
  end

end

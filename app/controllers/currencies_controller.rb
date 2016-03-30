class CurrenciesController < ApplicationController
  before_action :set_currency, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :admin_only, only: [:destroy]

  # GET /currencies.json
  def index
    @currencies = Currency.get_all
    render json: @currencies.to_json
  end

  # GET /currencies/1.json
  def show
    render json: @currecies.obj.to_json
  end

  # POST /currencies.json
  def create
    @currencies = Currency.new(currency_params)

    if @currencies.save
      render json: @currencies.obj
    else
      render json: @currencies.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /currencies/1.json
  def update
    if @currencies.update(currency_params)
      render json: @currencies.obj
    else
      render json: @currencies.errors, status: :unprocessable_entity
    end
  end

  # DELETE /currencies/1.json
  def destroy
    if @currencies.destroy
      head :no_content
    else
      render json: @currencies.errors, status: :not_destroyed
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_currency
    @currencies = Currency.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def currency_params
    params.require(:currency).permit(:name)
  end
end

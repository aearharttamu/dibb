class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  before_action :admin_only, only: [:destroy]

  # GET /people.json
  def index
    @people = Person.get_all
    render json: @people.to_json
  end

  # GET /people/1.json
  def show
    render json: @person.obj.to_json
  end

  # POST /people.json
  def create
    @person = Person.new(person_params)

    if @person.save
      render json: @person.obj
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /people/1.json
  def update
    if @person.update(person_params)
      render json: @person.obj
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  # DELETE /people/1.json
  def destroy
    if @person.destroy
      head :no_content
    else
      render json: @person.errors, status: :not_destroyed
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def person_params
      params.require(:person).permit(:full_name, :first_name, :middle_name, :last_name, :alternative_name )
    end
end

require 'test_helper'

class BiblioSetsControllerTest < ActionController::TestCase
  setup do
    @biblio_set = biblio_sets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:biblio_sets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create biblio_set" do
    assert_difference('BiblioSet.count') do
      post :create, biblio_set: { genre: @biblio_set.genre, title: @biblio_set.title }
    end

    assert_redirected_to biblio_set_path(assigns(:biblio_set))
  end

  test "should show biblio_set" do
    get :show, id: @biblio_set
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @biblio_set
    assert_response :success
  end

  test "should update biblio_set" do
    patch :update, id: @biblio_set, biblio_set: { genre: @biblio_set.genre, title: @biblio_set.title }
    assert_redirected_to biblio_set_path(assigns(:biblio_set))
  end

  test "should destroy biblio_set" do
    assert_difference('BiblioSet.count', -1) do
      delete :destroy, id: @biblio_set
    end

    assert_redirected_to biblio_sets_path
  end
end

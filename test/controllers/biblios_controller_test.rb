require 'test_helper'

class BibliosControllerTest < ActionController::TestCase
  setup do
    @biblio = biblios(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:biblios)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create biblio" do
    assert_difference('Biblio.count') do
      post :create, biblio: { biblio_set_id: @biblio.biblio_set_id, binding: @biblio.binding, category_as_appears: @biblio.category_as_appears, contents: @biblio.contents, date_as_appears: @biblio.date_as_appears, descriptors: @biblio.descriptors, item_as_appears: @biblio.item_as_appears, item_number: @biblio.item_number, pagination: @biblio.pagination, provenance: @biblio.provenance, publisher_id: @biblio.publisher_id, pub_number: @biblio.pub_number, size: @biblio.size, title: @biblio.title, unnumbered_pages: @biblio.unnumbered_pages, year: @biblio.year }
    end

    assert_redirected_to biblio_path(assigns(:biblio))
  end

  test "should show biblio" do
    get :show, id: @biblio
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @biblio
    assert_response :success
  end

  test "should update biblio" do
    patch :update, id: @biblio, biblio: { biblio_set_id: @biblio.biblio_set_id, binding: @biblio.binding, category_as_appears: @biblio.category_as_appears, contents: @biblio.contents, date_as_appears: @biblio.date_as_appears, descriptors: @biblio.descriptors, item_as_appears: @biblio.item_as_appears, item_number: @biblio.item_number, pagination: @biblio.pagination, provenance: @biblio.provenance, publisher_id: @biblio.publisher_id, pub_number: @biblio.pub_number, size: @biblio.size, title: @biblio.title, unnumbered_pages: @biblio.unnumbered_pages, year: @biblio.year }
    assert_redirected_to biblio_path(assigns(:biblio))
  end

  test "should destroy biblio" do
    assert_difference('Biblio.count', -1) do
      delete :destroy, id: @biblio
    end

    assert_redirected_to biblios_path
  end
end

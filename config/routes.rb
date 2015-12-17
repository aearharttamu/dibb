Rails.application.routes.draw do
  
  devise_for :users
  
  root 'home#index'
  
  resources :biblios, only: [ :index, :show, :update, :create, :destroy ]
     
	get "test_exception" => 'home#test_exception'
end

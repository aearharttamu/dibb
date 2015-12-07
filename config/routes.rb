Rails.application.routes.draw do
  
  devise_for :users
  
  root 'home#index'
  
  resources :biblios, only: [ :index, :show, :update, :create, :destroy ]
     
end

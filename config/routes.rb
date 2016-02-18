Rails.application.routes.draw do
  
  devise_for :users
  
  root 'home#index'
  
  resources :bibliographs, only: [ :index, :show, :update, :create, :destroy ]
  resources :publishers, only: [ :index, :show, :update, :create, :destroy ]
  resources :people, only: [ :index, :show, :update, :create, :destroy ]
  resources :roles, only: [ :index, :show, :update, :create, :destroy ]

  resources :biblio_sets, only: [ :index, :show, :update, :create, :destroy ] do
    resources :biblios, only: [ :index, :show, :update, :create, :destroy ] 
  end
  
  resources :biblios, only: [ ] do
    resources :citations, only: [ :index, :show, :update, :create, :destroy ] 
  end

	get "test_email" => 'home#test_email'
	get "test_exception" => 'home#test_exception'
  
end

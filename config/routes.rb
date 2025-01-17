Rails.application.routes.draw do
  
  devise_for :users
  
  root 'home#index'
  
  resources :bibliographs, only: [ :index, :show, :create, :destroy ]   
  resources :publishers, only: [ :index, :show, :update, :create, :destroy ]
  resources :people, only: [ :index, :show, :update, :create, :destroy ]
  resources :roles, only: [ :index, :show, :update, :create, :destroy ]
  resources :bindings, only: [ :index, :show, :update, :create, :destroy ]
  resources :formats, only: [ :index, :show, :update, :create, :destroy ]
  resources :currencies, only: [:index, :show, :update, :create, :destroy ]
  resources :titles, only: [ :index, :show, :update, :create, :destroy ]
  resources :admin, only: [ :index, :show, :update, :create ]
  resources :page_num_sequences, only: [ :index, :show, :update, :create, :destroy ]

  resources :biblio_sets, only: [ :index, :show, :update, :create, :destroy ] do
    resources :biblios, only: [ :index ]
  end
  
  resources :biblios, only: [ :show, :update, :create, :destroy  ] do
    resources :citations, only: [ :index, :show, :destroy ]     
    resources :page_num_sequences, only: [ :index, :show, :update, :create, :destroy ]
  end

  resources :citations, only: [ :create, :update ] 

  get "in_progress" => "bibliographs#in_progress"
      

  # get "test_email" => 'home#test_email'
  # get "test_exception" => 'home#test_exception'
  
end

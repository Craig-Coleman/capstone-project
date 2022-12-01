Rails.application.routes.draw do
  resources :assignments, except: [:new, :edit]
  resources :students, except: [:new, :edit]
  resources :periods, except: [:new, :edit]
  resources :courses, except: [:new, :edit]
  resources :users, only: [:show, :create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

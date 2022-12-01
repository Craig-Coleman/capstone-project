Rails.application.routes.draw do
  resources :assignments
  resources :students
  resources :periods
  resources :courses
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

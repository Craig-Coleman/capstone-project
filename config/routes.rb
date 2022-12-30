Rails.application.routes.draw do
  resources :assignments, except: [:new, :edit]
  resources :students, except: [:new, :edit]
  resources :periods, except: [:new, :edit]
  resources :courses, except: [:new, :edit]
  resources :users, except: [:index, :new, :edit]

  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get '/courses/:course_id/students', to: "students#roster_index"
  get '/courses/:course_id/assignments', to: "assignments#course_assignments_index"
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

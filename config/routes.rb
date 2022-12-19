Rails.application.routes.draw do
  resources :assignments, except: [:new, :edit]
  resources :students, except: [:new, :edit]
  resources :periods, except: [:new, :edit]
  resources :courses, except: [:new, :edit]
  resources :users, except: [:index, :new, :edit]

  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get '/courses/:course_id/students', to: "courses#students_index"
  get '/students/:student_id/assignments', to: "students#assignments_index"
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

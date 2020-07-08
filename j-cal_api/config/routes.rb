Rails.application.routes.draw do
  resources :events
  resources :users, only: [:create]
  post "login", to: "authentication#login"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

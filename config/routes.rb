Rails.application.routes.draw do

  resources :transcript_edits, only: [:index, :show, :create]
  resources :transcripts, only: [:index, :show]
  resources :collections, only: [:index, :show]
  mount_devise_token_auth_for 'User', at: 'auth', controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  root :to => 'default#index'
end

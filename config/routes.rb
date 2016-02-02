Rails.application.routes.draw do

  resources :transcript_edits, only: [:create]
  resources :transcripts, only: [:index, :show]
  resources :collections, only: [:index, :show]
  mount_devise_token_auth_for 'User', at: 'auth'

end

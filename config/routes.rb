Rails.application.routes.draw do

  resources :transcript_speaker_edits, only: [:create]
  resources :transcript_edits, only: [:index, :show, :create]
  resources :transcripts, only: [:index, :show]
  resources :collections, only: [:index, :show]

  mount_devise_token_auth_for 'User', at: 'auth', controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  match 'page/:id' => 'default#index', :via => [:get]
  match 'dashboard' => 'default#index', :via => [:get]

  # admin
  namespace :admin do
    resources :users, only: [:index, :update]
    resources :transcripts, only: [:index]
  end
  match 'admin' => 'admin/stats#index', :via => [:get]

  root :to => 'default#index'
end

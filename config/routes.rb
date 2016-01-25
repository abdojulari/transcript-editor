Rails.application.routes.draw do

  resources :transcript_lines, except: [:new, :edit]
  resources :transcripts, except: [:new, :edit]
  resources :collections, except: [:new, :edit]
  mount_devise_token_auth_for 'User', at: 'auth'

end

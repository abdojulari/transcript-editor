Rails.application.routes.draw do

  resources :collections, except: [:new, :edit]
  mount_devise_token_auth_for 'User', at: 'auth'

end

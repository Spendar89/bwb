Bwb::Application.routes.draw do

  resources :customers


  resources :rentals do
    collection do
      post 'reserve'
    end
  end


  resources :used_bikes


  resources :tags


  resources :current_events


  resources :bike_inventories

  post "bike_inventories/transfer" => "bike_inventories#transfer"


  resources :stores


  resources :bikes do
    member do
      post 'add_image'
    end
    collection do
      get 'images'
    end
  end

  root :to => 'application#index'
end

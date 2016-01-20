class CollectionsController < ApplicationController
  before_action :set_collection, only: [:show, :update, :destroy]

  # GET /collections
  # GET /collections.json
  def index
    @collections = Collection.all

    render json: @collections
  end

  # GET /collections/1
  # GET /collections/1.json
  def show
    render json: @collection
  end

  # POST /collections
  # POST /collections.json
  def create
    @collection = Collection.new(collection_params)

    if @collection.save
      render json: @collection, status: :created, location: @collection
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /collections/1
  # PATCH/PUT /collections/1.json
  def update
    @collection = Collection.find(params[:id])

    if @collection.update(collection_params)
      head :no_content
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  # DELETE /collections/1
  # DELETE /collections/1.json
  def destroy
    @collection.destroy

    head :no_content
  end

  private

    def set_collection
      @collection = Collection.find(params[:id])
    end

    def collection_params
      params.require(:collection).permit(:uid, :title, :description, :url, :image_url, :vendor_id, :vendor_identifier)
    end
end

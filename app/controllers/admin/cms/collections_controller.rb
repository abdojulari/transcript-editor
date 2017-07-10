class Admin::Cms::CollectionsController < ApplicationController
  def show
  end

  def new
    @resource = Collection.new
  end

  def create
  end

  def edit
    @resource = Collection.find(params[:id])
  end

  def update
  end
end

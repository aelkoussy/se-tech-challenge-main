class ActivitiesController < ApplicationController
  before_action :set_activity, only: %i[show update destroy]

  # GET /activities
  def index
    if params[:query].present?
      activities = Activity.includes(:supplier).search(params[:query]) # TODO if we need supplier info, we should do includes to avoid N+1 queries
    else
      # TODO this should be paginated, but for the sake of simplicity we will just limit to 10
      activities = Activity.includes(:supplier).all.limit(10)
    end
    render json: ActivityBlueprint.render(activities)
  end

  # GET /activities/1
  def show
    render json: ActivityBlueprint.render(@activity)
  end

  # POST /activities
  def create
    activity = Activity.new(activity_params)
    if activity.save
      render json: ActivityBlueprint.render(activity), status: :created
    else
      render json: {
               errors: activity.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  # PATCH/PUT /activities/1
  def update
    if @activity.update(activity_params)
      render json: ActivityBlueprint.render(@activity)
    else
      render json: {
               errors: @activity.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  # DELETE /activities/1
  def destroy
    @activity.destroy!
    head :no_content
  end

  private

  def set_activity
    @activity = Activity.find(params[:id])
  end

  def activity_params
    params.require(:activity).permit(
      :title,
      :price,
      :currency,
      :rating,
      :special_offer,
      :supplier_id
    )
  end
end

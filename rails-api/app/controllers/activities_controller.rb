class ActivitiesController < ApplicationController
  before_action :set_activity, only: %i[show update destroy]

  # GET /activities
  # TODO this should have pagination
  def index
    if params[:query].present?
      @activities = Activity.search(params[:query]) # TODO if we need supplier info, we should do includes to avoid N+1 queries
    else
      @activities = Activity.all
    end

    # TODO consider adding a serializer
    render json: @activities
  end

  # GET /activities/1
  def show
    render json: @activity
  end

  # POST /activities
  def create
    @activity = Activity.new(activity_params)

    if @activity.save
      render json: @activity, status: :created, location: @activity
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /activities/1
  def update
    if @activity.update(activity_params)
      render json: @activity
    else
      render json: @activity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /activities/1
  def destroy
    @activity.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_activity
    @activity = Activity.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def activity_params
    params.expect(
      activity: %i[title price currency rating special_offer supplier_id]
    )
  end
end

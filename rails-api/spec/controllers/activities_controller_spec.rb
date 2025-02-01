# spec/controllers/activities_controller_spec.rb
require "rails_helper"

RSpec.describe ActivitiesController, type: :controller do
  let!(:supplier) { create(:supplier) } # This creates a new supplier with a unique ID
  let!(:activities) { create_list(:activity, 10, supplier_id: supplier.id) } # Create activities linked to the supplier

  describe "GET #index" do
    context "when there is no search query" do
      # TODO this should have pagination
      it "returns all activities" do
        get :index

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)

        expect(json_response.size).to eq(Activity.count)
      end
    end

    context "when a search query is provided" do
      it "returns filtered activities" do
        # Assuming you have an activity with a specific attribute to search
        query = activities.first.title # Replace with the attribute you want to search

        # Mock the search method to return only the searched activity - because we don't have to test meilisearch itself in unit tests
        # We can test the meilisearch integration in an integration test that is run less frequently (since it is slower)
        allow(Activity).to receive(:search).with(query).and_return(
          [activities.first]
        )

        get :index, params: { query: query }

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(1) # Expecting one activity to be returned
        expect(json_response.first["title"]).to eq(activities.first.title)
      end
    end
  end
end

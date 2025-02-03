# spec/controllers/activities_controller_spec.rb
require "rails_helper"

RSpec.describe ActivitiesController, type: :controller do
  let!(:supplier) { create(:supplier) }
  let!(:activities) { create_list(:activity, 5, supplier_id: supplier.id) }

  describe "GET #index" do
    context "when there is no search query" do
      it "returns all activities" do
        get :index

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)

        expect(json_response.size).to eq(Activity.count)
      end
    end

    context "when a search query is provided" do
      it "returns filtered activities" do
        query = activities.first.title

        # Mock the search method to return only the searched activity - because we don't have to test meilisearch itself in unit tests
        # We can test the meilisearch integration in an integration test that is run less frequently (since it is slower)

        allow(Activity).to receive(:search).with(query).and_return(
          [activities.first]
        )

        get :index, params: { query: query }

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(1)
        expect(json_response.first["title"]).to eq(activities.first.title)
      end
    end

    context "when no activities are found" do
      it "returns an empty array" do
        get :index, params: { query: "nonexistent" }

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq([])
      end
    end
  end

  describe "GET #show" do
    context "when the activity exists" do
      it "returns the activity" do
        get :show, params: { id: activities.first.id }
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(activities.first.id)
      end
    end

    context "when the activity does not exist" do
      it "returns a not found status" do
        get :show, params: { id: 9999 } # This ID should not exist
        expect(response).to have_http_status(:not_found)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Activity not found")
      end
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new activity" do
        expect {
          post :create,
               params: {
                 activity: {
                   title: "New Activity",
                   price: 100,
                   currency: "$",
                   rating: 4.5,
                   special_offer: true,
                   supplier_id: supplier.id
                 }
               }
        }.to change(Activity, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable entity status" do
        post :create, params: { activity: { title: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH/PUT #update" do
    context "with valid parameters" do
      it "updates the activity" do
        put :update,
            params: {
              id: activities.first.id,
              activity: {
                title: "Updated Title"
              }
            }
        expect(response).to have_http_status(:success)
        expect(activities.first.reload.title).to eq("Updated Title")
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable entity status" do
        put :update,
            params: {
              id: activities.first.id,
              activity: {
                title: nil
              }
            }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    it "deletes the activity" do
      expect { delete :destroy, params: { id: activities.first.id } }.to change(
        Activity,
        :count
      ).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end

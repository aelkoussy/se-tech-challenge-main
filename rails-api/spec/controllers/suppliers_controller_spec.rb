# spec/controllers/suppliers_controller_spec.rb
require "rails_helper"

RSpec.describe SuppliersController, type: :controller do
  let!(:suppliers) { create_list(:supplier, 3) } # additional suppliers for index
  let!(:supplier) { suppliers.first } # Fix: Move supplier into let block

  describe "GET #index" do
    it "returns all suppliers" do
      get :index
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      # Expect total count to be suppliers.count + the one from let!(:supplier)
      expect(json_response.size).to eq(Supplier.count)
    end
  end

  describe "GET #show" do
    context "when the supplier exists" do
      it "returns the supplier" do
        get :show, params: { id: supplier.id }
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(supplier.id)
      end
    end

    context "when the supplier does not exist" do
      it "returns a not found status" do
        get :show, params: { id: 9999 } # assuming this ID does not exist
        expect(response).to have_http_status(:not_found)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Supplier not found")
      end
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      let(:valid_attributes) do
        {
          supplier: {
            name: "New Supplier",
            address: "456 Another St",
            zip: "67890",
            city: "Another City",
            country: "Another Country"
          }
        }
      end

      it "creates a new supplier" do
        expect { post :create, params: valid_attributes }.to change(
          Supplier,
          :count
        ).by(1)
        expect(response).to have_http_status(:created)
      end

      it "returns the supplier location in headers" do
        post :create, params: valid_attributes
        expect(response.headers["Location"]).to be_present
      end
    end

    context "with invalid parameters" do
      let(:invalid_attributes) do
        {
          supplier: {
            name: nil,
            address: "456 Another St",
            zip: "67890",
            city: "Another City",
            country: "Another Country"
          }
        }
      end

      it "returns unprocessable entity status" do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH/PUT #update" do
    context "with valid parameters" do
      let(:valid_attributes) { { name: "Updated Name" } }

      it "updates the supplier" do
        patch :update, params: { id: supplier.id, supplier: valid_attributes }
        expect(response).to have_http_status(:success)
        supplier.reload
        expect(supplier.name).to eq("Updated Name")
      end
    end

    context "with invalid parameters" do
      let(:invalid_attributes) { { supplier: { name: nil } } }

      it "returns unprocessable entity status" do
        put :update, params: { id: supplier.id }.merge(invalid_attributes)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    it "deletes the supplier" do
      supplier_to_delete = supplier # Create local reference
      expect {
        delete :destroy, params: { id: supplier_to_delete.id }
      }.to change(Supplier, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end

class SuppliersController < ApplicationController
  before_action :set_supplier, only: %i[show update destroy]

  # GET /suppliers
  def index
    @suppliers = Supplier.all

    render json: @suppliers
  end

  # GET /suppliers/1
  def show
    render json: @supplier
  end

  # POST /suppliers
  def create
    @supplier = Supplier.new(supplier_params)

    if @supplier.save
      render json: @supplier, status: :created, location: @supplier
    else
      render json: @supplier.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /suppliers/1
  def update
    if @supplier.update(supplier_params)
      render json: @supplier
    else
      render json: { errors: @supplier.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /suppliers/1
  def destroy
    @supplier.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_supplier
    @supplier = Supplier.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Supplier not found" }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def supplier_params
    params.require(:supplier).permit(:name, :description)
  end
end

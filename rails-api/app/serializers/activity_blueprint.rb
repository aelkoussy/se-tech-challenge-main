class ActivityBlueprint < Blueprinter::Base
  identifier :id
  fields :title, :price, :currency, :rating, :special_offer

  association :supplier, blueprint: SupplierBlueprint
end

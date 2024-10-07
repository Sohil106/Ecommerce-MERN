const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [2000, "wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
    default: 0,
  },
  tags: {
    type: [String],
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    depth: {
      type: Number,
    },
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
  },
  reviews: [
    {
      rating: Number,
      comment: String,
      date: Date,
      reviewerName: String,
      reviewerEmail: String,
    },
  ],
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
  },
  meta: {
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    barcode: {
      type: String,
    },
    qrCode: {
      type: String,
    },
  },
  images: {
    type: [String],
  },
  thumbnail: {
    type: String,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);

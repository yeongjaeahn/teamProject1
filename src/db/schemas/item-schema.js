import { Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    collection: "items",
    timestamps: true,
  }
);

export { ItemSchema };

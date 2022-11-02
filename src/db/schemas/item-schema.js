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
      data: Buffer,
      contentType: String,
    },
    thumbnail: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    collection: "items",
    timestamps: true,
  }
);

export { ItemSchema };

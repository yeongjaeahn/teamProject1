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
    image: {
      type: String,
      data: Buffer,
      required: true,
    },
    thumbnail: {
      type: String,
      data: Buffer,
      requried: true,
    },
    category: {
      type: String,
      requried: true,
    },
  },
  {
    collection: "items",
    timestamps: true,
  }
);

export { ItemSchema };

import { model } from "mongoose"; //mongoose.model
import { ItemSchema } from "../schemas/item-schema";

const Item = model("items", ItemSchema);

export class ItemModal {
  async create(itemInfo) {
    const createdNewItem = await Item.create(itemInfo);
    return createdNewItem;
  }

  async findAll() {
    const items = await Item.find({});
    return items;
  }

  async findById(_id) {
    const item = await Item.findById(_id);
    return item;
  }
}

const itemModel = new ItemModal();

export { itemModel };

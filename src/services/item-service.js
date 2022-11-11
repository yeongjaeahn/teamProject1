import { itemModel } from "../db";

class ItemService {
  constructor(itemModel) {
    this.itemModel = itemModel;
  }

  // 아이템 추가
  async addItem(itemInfo) {
    // 객체 destructing
    const { name, shortName, price, category, image, thumbnail } = itemInfo;

    // db에 저장
    const createdNewItem = await this.itemModel.create(itemInfo);

    return createdNewItem;
  }

  // 아이템 목록 받음.
  async getItems() {
    const items = await this.itemModel.findAll();
    return items;
  }

  // 아이템 상세페이지 받음.
  async getItem(_id) {
    const item = await this.itemModel.findById(_id);
    return item;
  }
}

const itemService = new ItemService(itemModel);

export { itemService };

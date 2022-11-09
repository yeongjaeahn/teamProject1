import { orderItemModel } from "../db";

class OrderItemService {
  constructor(orderItemModel) {
    this.orderItemModel = orderItemModel;
  }

  async addItem(orderItemInfo) {
    const createdNewOrderItem = await this.orderItemModel.create(orderItemInfo);

    return createdNewOrderItem;
  }

  async getItems() {
    const orderItems = await this.orderItemModel.findAll();

    return orderItems;
  }
}

const orderItemService = new OrderItemService(orderItemModel);

export { orderItemService };

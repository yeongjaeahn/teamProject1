// 전체 주문아이템 목록은 관리자만 조회 가능함
import { Router } from "express";
import { adminOnly } from "../middlewares";
import { orderItemService } from "../services/order-item-service";

const orderItemRouter = Router();

orderItemRouter.get(
  "/orderitemlist/all",
  adminOnly,
  async function (req, res, next) {
    try {
      const orderItems = await orderItemService.getItems();

      res.status(200).json(orderItems);
    } catch (error) {
      next(error);
    }
  }
);

import is from "@sindresorhus/is";
import { Router } from "express";
import { adminOnly, loginRequired } from "../middlewares";
import { orderService } from "../services/order-service";

const orderRouter = Router();

orderRouter.post("/order", loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const userId = req.currentUserId;
    const summaryTitle = req.body.summaryTitle;
    const totalPrice = req.body.totalPrice;
    const address = req.body.address;

    const newOrder = await orderService.addOrder({
      userId,
      summaryTitle,
      totalPrice,
      address,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/orderlist/all", adminOnly, async function (req, res, next) {
  try {
    const userId = req.currentUserId;

    const orders = await orderService.getOrdersByUserId(userId);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get(
  "/orders/:orderId",
  loginRequired,
  async function (req, res, next) {
    try {
      const orderId = req.params.orderId;
      const orderData = await orderService.getOrderData(orderId);

      res.status(200).json(orderData);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.patch(
  "/orders/:orderId",
  loginRequired,
  async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const orderId = req.params.orderId;
      const address = req.body.address;
      // const request = req.body.request;
      const status = req.body.status;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(address && { address }),
        // ...(request && { request }),
        ...(status && { status }),
      };

      // 제품 정보를 업데이트함.
      const updatedOrder = await orderService.setOrder(orderId, toUpdate);

      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

orderRouter.delete(
  "/orders/:orderId",
  loginRequired,
  async function (req, res, next) {
    try {
      const orderId = req.params.orderId;
      const deleteResult = await orderService.deleteOrderData(orderId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

export { orderRouter };

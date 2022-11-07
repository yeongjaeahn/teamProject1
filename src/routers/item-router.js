import is from "@sindresorhus/is";
import { Router } from "express";
import { itemService } from "../services/item-service";
import { upload } from "../utils/multer";

const itemRouter = Router(); 
////이게 const router =express.router();

// item 등록 api
itemRouter.post(
  "/register-item",
  upload.single("image"),
  async (req, res, next) => {
    try {
      // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request)의 body 에서 데이터 가져오기
      const name = req.body.name;
      const shortName = req.body.shortName;
      const price = req.body.price;
      const category = req.body.category;
      const image = req.file;
      const thumbnail = req.body.thumbnail;

      // 위 데이터를 유저 db에 추가하기
      const newItem = await itemService.addItem({
        name,
        shortName,
        price,
        category,
        image,
        thumbnail,
      });

      // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
      // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

// 아이템 전체 목록
itemRouter.get("/itemlist", async function (req, res, next) {
  try {
    // 전체 아이템 목록을 얻음
    const items = await itemService.getItems();

    // 아이템 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 아이템 상세페이지
itemRouter.get("/item/:_id", async function (req, res, next) {
  try {
    const item = await itemService.getItem(req.params._id);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// 카테고리별 아이템 목록

export { itemRouter };

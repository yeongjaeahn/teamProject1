const mongoose = require("mongoose");
import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userEmail, update }) {
    console.log(userEmail, update);
    const filter = { email: userEmail };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete({ email }) {
    console.log({ email });
    const deletedUser = await User.findOneAndDelete({ email });
    return deletedUser;
  }
}

const userModel = new UserModel();

export { userModel };

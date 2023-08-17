import bcrypt from "bcrypt";

import { UserModel, userInitialData, saltRounds } from "../models/user";

export const initialDb = () => {
  UserModel.count((_: any, count: any) => {
    if (count === 0) {
      userInitialData.forEach((userData) => {
        UserModel.create({
          ...userData,
          password: bcrypt.hashSync(userData.password, saltRounds),
        });
      });
    }
  });
};

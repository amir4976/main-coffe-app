import ConnectToDb from "../../configs/db";
import userModel from "../models/User";
import { verifyToken } from "./auth";
const cookies = require("next/headers");

const authUser = async () => {
  await ConnectToDb();
  const AccessToken = cookies.cookies().get("Token")?.value;
  let user = null;
  if (AccessToken) {
    const tokenPayload = await verifyToken(AccessToken);
    if (tokenPayload) {
      user = await userModel.findOne({ email: tokenPayload.email });
    }
  }
  return user;
};

const authAdmin = async () => {
  await ConnectToDb();
  const AccessToken = cookies.cookies().get("Token")?.value;
  let user = null;
  // if user have access token and token is valid then get user data and check if user is admin
  if (AccessToken) {
    const tokenPayload = await verifyToken(AccessToken);
    // if token is valid then get user data and check if user is admin
    if (tokenPayload) {
      // find user by email
      user = await userModel.findOne({ email: tokenPayload.email });
      // if user is admin then return user
      if (user.role === "ADMIN") {
        return user;
      } else {
        // if user is not admin then return null
        return null;
      }
    // if token is not valid then return null
    } else {
      return null; 
    }
  }
  return user;
};

export { authUser, authAdmin };

import { Router } from "express";
import UserController from "../controllers/UserController";

const users: Router = Router();

users.get("/", new UserController().list);
users.post("/", new UserController().create);
users.put("/:id", new UserController().update);
users.delete("/:id", new UserController().delete);

export default users;

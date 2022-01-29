import { Router, Request, Response } from "express";
import users from "./user.routes";

const router: Router = Router();

router.use("/users", users);

export default router;

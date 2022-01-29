import { User } from "@prisma/client";
import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUsersService from "../services/ListUsersService";
import UpdateUserService from "../services/UpdateUserService";

class UserController {
  async list(request: Request, response: Response) {
    try {
      const users: Array<User> = await new ListUsersService().execute();

      return response.json(users);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const user: User = await new CreateUserService().execute({
        name,
        email,
        password,
      });

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, email, password } = request.body;

      const userUpdated: User = await new UpdateUserService().execute({
        id,
        name,
        email,
        password,
      });

      return response.json(userUpdated);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userDeleted = await new DeleteUserService().execute({ id });

      return response.json(userDeleted);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export default UserController;

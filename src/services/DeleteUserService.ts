import { User } from "@prisma/client";
import prismaClient from "../database";

interface ResponseDeletedUserDTO {
  message: string;
  userDeleted?: User;
}

interface DeleteUserDTO {
  id: string;
}

class DeleteUserService {
  async execute({ id }: DeleteUserDTO): Promise<ResponseDeletedUserDTO> {
    const user: User | null = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("This user repassed does not exists in our database");
    }

    const deletedUser: User = await prismaClient.user.delete({ where: { id } });

    if (deletedUser) {
      return {
        message: "This user deleted with success in our database",
        userDeleted: deletedUser,
      };
    } else {
      return {
        message: "This user not have deleted in our database",
      };
    }
  }
}

export default DeleteUserService;

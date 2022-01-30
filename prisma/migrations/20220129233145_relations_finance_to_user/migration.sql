/*
  Warnings:

  - Added the required column `user_id` to the `finances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finances" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "finances" ADD CONSTRAINT "finances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

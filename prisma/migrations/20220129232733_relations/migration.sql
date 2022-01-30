/*
  Warnings:

  - Added the required column `user_id` to the `type_finance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "type_finance" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "type_finance" ADD CONSTRAINT "type_finance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

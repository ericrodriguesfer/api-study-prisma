/*
  Warnings:

  - Added the required column `updatedAt` to the `finances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `type_finance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finances" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "type_finance" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

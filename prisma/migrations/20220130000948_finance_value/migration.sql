/*
  Warnings:

  - Added the required column `value` to the `finances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finances" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

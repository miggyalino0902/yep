/*
  Warnings:

  - Added the required column `status` to the `Prize` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrizeStatus" AS ENUM ('Available', 'Taken');

-- AlterTable
ALTER TABLE "Prize" ADD COLUMN     "status" "PrizeStatus" NOT NULL;

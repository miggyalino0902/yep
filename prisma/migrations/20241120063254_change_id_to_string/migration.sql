/*
  Warnings:

  - The primary key for the `Participants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Participants" DROP CONSTRAINT "Participants_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Participants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Participants_id_seq";

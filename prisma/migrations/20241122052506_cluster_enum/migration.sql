/*
  Warnings:

  - The values [Engineering,Operations] on the enum `Cluster` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[prizeId]` on the table `Participants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Cluster_new" AS ENUM ('BusinessDevelopmentCluster', 'ClientOperationsCluster', 'EngineeringCluster', 'FinanceOperationsCluster', 'LeasingCluster', 'MarketDevelopmentCluster', 'MarketingCluster', 'OperationsExcellence', 'PeopleCluster', 'PoplarCompanies', 'PostLeasingCluster', 'PropertyOperationsCluster');
ALTER TABLE "Participants" ALTER COLUMN "cluster" TYPE "Cluster_new" USING ("cluster"::text::"Cluster_new");
ALTER TYPE "Cluster" RENAME TO "Cluster_old";
ALTER TYPE "Cluster_new" RENAME TO "Cluster";
DROP TYPE "Cluster_old";
COMMIT;

-- AlterTable
ALTER TABLE "Participants" ADD COLUMN     "claimedPrizeAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Participants_prizeId_key" ON "Participants"("prizeId");

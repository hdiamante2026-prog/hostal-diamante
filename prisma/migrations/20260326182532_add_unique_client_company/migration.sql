/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `client-companies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Reason" ADD VALUE 'Negocio';
ALTER TYPE "Reason" ADD VALUE 'Estudios';

-- AlterTable
ALTER TABLE "stay" ADD COLUMN     "companyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "client-companies_name_key" ON "client-companies"("name");

-- CreateIndex
CREATE INDEX "client-companies_name_idx" ON "client-companies"("name");

-- AddForeignKey
ALTER TABLE "stay" ADD CONSTRAINT "stay_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "client-companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

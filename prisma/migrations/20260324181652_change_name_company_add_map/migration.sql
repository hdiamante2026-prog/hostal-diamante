/*
  Warnings:

  - You are about to drop the `Chassis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chassis" DROP CONSTRAINT "Chassis_companyId_fkey";

-- DropTable
DROP TABLE "Chassis";

-- DropTable
DROP TABLE "Company";

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dayPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chassis" (
    "number" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "chassis_pkey" PRIMARY KEY ("number")
);

-- AddForeignKey
ALTER TABLE "chassis" ADD CONSTRAINT "chassis_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

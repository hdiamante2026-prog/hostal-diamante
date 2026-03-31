/*
  Warnings:

  - You are about to drop the `chassis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chassis" DROP CONSTRAINT "chassis_companyId_fkey";

-- DropTable
DROP TABLE "chassis";

-- DropTable
DROP TABLE "company";

-- CreateTable
CREATE TABLE "ClientCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dayPrice" DOUBLE PRECISION NOT NULL,
    "chassisList" TEXT[],

    CONSTRAINT "ClientCompany_pkey" PRIMARY KEY ("id")
);

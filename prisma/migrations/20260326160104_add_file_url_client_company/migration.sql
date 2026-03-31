/*
  Warnings:

  - You are about to drop the `ClientCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ClientCompany";

-- CreateTable
CREATE TABLE "client-companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dayPrice" DOUBLE PRECISION NOT NULL,
    "chassisList" TEXT[],
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "client-companies_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - The values [Personal,Matrimonial_Simple] on the enum `TypeRoom` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "TypeDocuments" ADD VALUE 'CI_Brazil';

-- AlterEnum
BEGIN;
CREATE TYPE "TypeRoom_new" AS ENUM ('Simple', 'Matrimonial', 'Doble', 'Doble_Familiar', 'Cuadruple', 'Triple', 'Triple_Familiar');
ALTER TABLE "room" ALTER COLUMN "type" TYPE "TypeRoom_new" USING ("type"::text::"TypeRoom_new");
ALTER TYPE "TypeRoom" RENAME TO "TypeRoom_old";
ALTER TYPE "TypeRoom_new" RENAME TO "TypeRoom";
DROP TYPE "public"."TypeRoom_old";
COMMIT;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dayPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chassis" (
    "number" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Chassis_pkey" PRIMARY KEY ("number")
);

-- AddForeignKey
ALTER TABLE "Chassis" ADD CONSTRAINT "Chassis_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

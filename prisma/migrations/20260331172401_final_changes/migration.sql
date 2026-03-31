/*
  Warnings:

  - The values [Trabajo,Turismo,Negocio,Estudios,Comercio] on the enum `Reason` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Reason_new" AS ENUM ('Vacaciones', 'Visita', 'Educacion', 'Salud', 'Religion', 'Compras', 'Negocios', 'Otros');
ALTER TABLE "stay" ALTER COLUMN "reason" TYPE "Reason_new" USING ("reason"::text::"Reason_new");
ALTER TYPE "Reason" RENAME TO "Reason_old";
ALTER TYPE "Reason_new" RENAME TO "Reason";
DROP TYPE "public"."Reason_old";
COMMIT;

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterEnum
ALTER TYPE "Reason" ADD VALUE 'Comercio';

-- DropForeignKey
ALTER TABLE "client-stay" DROP CONSTRAINT "client-stay_stayId_fkey";

-- DropForeignKey
ALTER TABLE "pay" DROP CONSTRAINT "pay_stayId_fkey";

-- AddForeignKey
ALTER TABLE "client-stay" ADD CONSTRAINT "client-stay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay" ADD CONSTRAINT "pay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

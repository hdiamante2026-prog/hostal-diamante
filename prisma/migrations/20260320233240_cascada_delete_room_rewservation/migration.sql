-- DropForeignKey
ALTER TABLE "room-reservation" DROP CONSTRAINT "room-reservation_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "room-reservation" ADD CONSTRAINT "room-reservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

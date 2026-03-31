/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `room-reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "room-reservation_roomId_key" ON "room-reservation"("roomId");

-- CreateEnum
CREATE TYPE "TypeRoom" AS ENUM ('Personal', 'Doble', 'Doble_Familiar', 'Matrimonial', 'Matrimonial_Simple', 'Triple_Familiar');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('free', 'busy', 'reserved', 'disabled');

-- CreateEnum
CREATE TYPE "TypeDocuments" AS ENUM ('DNI', 'Pasaporte', 'Carnet_Extranjeria', 'Otros');

-- CreateEnum
CREATE TYPE "Reason" AS ENUM ('Trabajo', 'Turismo');

-- CreateEnum
CREATE TYPE "PayType" AS ENUM ('efectivo', 'electronico');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT,
    "banned" BOOLEAN DEFAULT false,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),
    "lastName" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "number" INTEGER NOT NULL,
    "type" "TypeRoom" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "status" "TypeStatus" NOT NULL DEFAULT 'free',
    "floor" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "posW" DOUBLE PRECISION,
    "posH" DOUBLE PRECISION,

    CONSTRAINT "room_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "roomActive" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "dateMoved" TIMESTAMP(3),
    "room" INTEGER,

    CONSTRAINT "roomActive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flag" TEXT NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "typeDocument" "TypeDocuments" NOT NULL,
    "numberDocument" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "stars" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalStays" INTEGER NOT NULL DEFAULT 0,
    "lastStay" TIMESTAMP(3),
    "address" TEXT,
    "phone" TEXT,
    "comments" TEXT,
    "born" TIMESTAMP(3) NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "banReason" TEXT,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client-stay" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "stayId" INTEGER NOT NULL,

    CONSTRAINT "client-stay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stay" (
    "id" SERIAL NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "paidUntil" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "totalCost" DOUBLE PRECISION,
    "stars" INTEGER DEFAULT 0,
    "reason" "Reason",
    "origin" TEXT NOT NULL,
    "carPlate" TEXT,
    "comments" TEXT,
    "images" TEXT,

    CONSTRAINT "stay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pay" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payType" "PayType" NOT NULL DEFAULT 'efectivo',
    "mount" DOUBLE PRECISION NOT NULL,
    "operationNumber" TEXT,
    "stayId" INTEGER,
    "startDayDate" TIMESTAMP(3),
    "endDayDate" TIMESTAMP(3),

    CONSTRAINT "pay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report-comments" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "report-comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room-reservation" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "room-reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "persons" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "client_countryId_idx" ON "client"("countryId");

-- CreateIndex
CREATE INDEX "client_firstName_idx" ON "client"("firstName");

-- CreateIndex
CREATE INDEX "client_lastName_idx" ON "client"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "client_typeDocument_numberDocument_key" ON "client"("typeDocument", "numberDocument");

-- CreateIndex
CREATE UNIQUE INDEX "client-stay_clientId_stayId_key" ON "client-stay"("clientId", "stayId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomActive" ADD CONSTRAINT "roomActive_room_fkey" FOREIGN KEY ("room") REFERENCES "room"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client-stay" ADD CONSTRAINT "client-stay_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client-stay" ADD CONSTRAINT "client-stay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stay" ADD CONSTRAINT "stay_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stay" ADD CONSTRAINT "stay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay" ADD CONSTRAINT "pay_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "stay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay" ADD CONSTRAINT "pay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room-reservation" ADD CONSTRAINT "room-reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room-reservation" ADD CONSTRAINT "room-reservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

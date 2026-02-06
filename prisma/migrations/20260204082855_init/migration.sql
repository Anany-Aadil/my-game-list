-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CURRENTLY_PLAYING', 'ON_HOLD', 'COMPLETED', 'DROPPED', 'PLAN_TO_PLAY');

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cover" TEXT,
    "year" INTEGER,
    "status" "Status" NOT NULL,
    "score" INTEGER,
    "platforms" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

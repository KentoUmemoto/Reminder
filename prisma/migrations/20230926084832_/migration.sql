-- CreateEnum
CREATE TYPE "RepeatType" AS ENUM ('YEAR', 'MONTH', 'WEEK', 'ONCE');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL,
    "repeat_type" "RepeatType" NOT NULL DEFAULT 'ONCE',

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

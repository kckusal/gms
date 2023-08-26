-- CreateEnum
CREATE TYPE "SecurityRole" AS ENUM ('ADMIN', 'TRAINER', 'MEMBER');

-- CreateEnum
CREATE TYPE "UserAccountRequestStatus" AS ENUM ('REQUESTED', 'CONFIRMED', 'DENIED');

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "account_request_status" "UserAccountRequestStatus" NOT NULL,
    "role" "SecurityRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" SERIAL NOT NULL,
    "start_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainer_id" INTEGER NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSessionAttendance" (
    "id" SERIAL NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT NOT NULL,
    "training_session_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "TrainingSessionAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerReview" (
    "id" SERIAL NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "review_comment" TEXT NOT NULL,
    "stars" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TrainerReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_training_session_participants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_username_key" ON "UserAccount"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSession_start_datetime_end_datetime_trainer_id_key" ON "TrainingSession"("start_datetime", "end_datetime", "trainer_id");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSessionAttendance_training_session_id_participant_i_key" ON "TrainingSessionAttendance"("training_session_id", "participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerReview_reviewer_id_trainer_id_key" ON "TrainerReview"("reviewer_id", "trainer_id");

-- CreateIndex
CREATE UNIQUE INDEX "_training_session_participants_AB_unique" ON "_training_session_participants"("A", "B");

-- CreateIndex
CREATE INDEX "_training_session_participants_B_index" ON "_training_session_participants"("B");

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSessionAttendance" ADD CONSTRAINT "TrainingSessionAttendance_training_session_id_fkey" FOREIGN KEY ("training_session_id") REFERENCES "TrainingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSessionAttendance" ADD CONSTRAINT "TrainingSessionAttendance_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerReview" ADD CONSTRAINT "TrainerReview_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerReview" ADD CONSTRAINT "TrainerReview_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_training_session_participants" ADD CONSTRAINT "_training_session_participants_A_fkey" FOREIGN KEY ("A") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_training_session_participants" ADD CONSTRAINT "_training_session_participants_B_fkey" FOREIGN KEY ("B") REFERENCES "UserAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

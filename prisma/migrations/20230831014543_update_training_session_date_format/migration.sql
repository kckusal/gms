/*
  Warnings:

  - You are about to drop the column `end_datetime` on the `TrainingSession` table. All the data in the column will be lost.
  - You are about to drop the column `start_datetime` on the `TrainingSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trainer_id]` on the table `TrainingSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_HHmm` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_HHmm` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `TrainingSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TrainingSession_start_datetime_end_datetime_trainer_id_key";

-- AlterTable
ALTER TABLE "TrainingSession" DROP COLUMN "end_datetime",
DROP COLUMN "start_datetime",
ADD COLUMN     "end_HHmm" TEXT NOT NULL,
ADD COLUMN     "end_date" TEXT NOT NULL,
ADD COLUMN     "start_HHmm" TEXT NOT NULL,
ADD COLUMN     "start_date" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSession_trainer_id_key" ON "TrainingSession"("trainer_id");

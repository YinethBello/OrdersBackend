/*
  Warnings:

  - Added the required column `code` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Manufacturer` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoomNumber` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SerialNumber` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingName` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorLevelNum` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `make` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelNumber` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityId` to the `Floor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorLevel` to the `Floor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoneId` to the `Floor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "floorCode" TEXT,
ADD COLUMN     "roomNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AreaType" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "Manufacturer" TEXT NOT NULL,
ADD COLUMN     "RoomNumber" TEXT NOT NULL,
ADD COLUMN     "SerialNumber" TEXT NOT NULL,
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "alternateTag" TEXT,
ADD COLUMN     "buildingName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "floorLevelNum" TEXT NOT NULL,
ADD COLUMN     "make" TEXT NOT NULL,
ADD COLUMN     "modelNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EquipmentType" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Floor" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "facilityId" TEXT NOT NULL,
ADD COLUMN     "floorLevel" TEXT NOT NULL,
ADD COLUMN     "zoneId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "recurrenceDay" INTEGER;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

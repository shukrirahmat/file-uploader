/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Folder_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Folder_id_name_key" ON "Folder"("id", "name");

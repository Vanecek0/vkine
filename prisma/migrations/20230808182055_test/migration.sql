/*
  Warnings:

  - You are about to drop the column `userDataId` on the `UserFavourites` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFavourites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL DEFAULT 'movie',
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFavourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserFavourites" ("addedAt", "id", "itemId", "itemType", "userId") SELECT "addedAt", "id", "itemId", "itemType", "userId" FROM "UserFavourites";
DROP TABLE "UserFavourites";
ALTER TABLE "new_UserFavourites" RENAME TO "UserFavourites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

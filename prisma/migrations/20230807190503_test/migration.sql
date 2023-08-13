-- CreateTable
CREATE TABLE "UserFavourites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemType" TEXT NOT NULL DEFAULT 'movie',
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userDataId" INTEGER,
    CONSTRAINT "UserFavourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserFavourites_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserWatchlist" (
    "userId" INTEGER NOT NULL,
    "movies" TEXT NOT NULL DEFAULT '',
    "tvs" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWatchlist_userId_key" ON "UserWatchlist"("userId");

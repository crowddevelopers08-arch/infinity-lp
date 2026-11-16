-- CreateTable
CREATE TABLE "HtLead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "planning" TEXT NOT NULL,
    "concern" TEXT NOT NULL,
    "locationComfortable" BOOLEAN NOT NULL,
    "pageUrl" TEXT,
    "telecrmStatus" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "HtLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HtLead_createdAt_idx" ON "HtLead"("createdAt");

-- CreateIndex
CREATE INDEX "HtLead_phone_idx" ON "HtLead"("phone");

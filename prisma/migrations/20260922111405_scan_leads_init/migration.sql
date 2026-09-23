-- CreateTable
CREATE TABLE "ScanLead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,
    "concern" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "consultationTime" TEXT NOT NULL,
    "pageUrl" TEXT,
    "photoStatus" TEXT,
    "uploadToken" TEXT,
    "telecrmStatus" TEXT NOT NULL DEFAULT 'Pending',
    "telecrmLeadId" TEXT,

    CONSTRAINT "ScanLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanPhoto" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "data" BYTEA NOT NULL,

    CONSTRAINT "ScanPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScanLead_createdAt_idx" ON "ScanLead"("createdAt");

-- CreateIndex
CREATE INDEX "ScanLead_phone_idx" ON "ScanLead"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ScanPhoto_leadId_key" ON "ScanPhoto"("leadId");

-- AddForeignKey
ALTER TABLE "ScanPhoto" ADD CONSTRAINT "ScanPhoto_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "ScanLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

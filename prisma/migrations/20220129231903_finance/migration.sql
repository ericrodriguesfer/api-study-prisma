-- CreateTable
CREATE TABLE "finances" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type_finance_id" TEXT NOT NULL,

    CONSTRAINT "finances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "finances" ADD CONSTRAINT "finances_type_finance_id_fkey" FOREIGN KEY ("type_finance_id") REFERENCES "type_finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add adjustment and notes columns to invoices table
ALTER TABLE invoices
ADD COLUMN adjustment NUMERIC(15,2) NOT NULL DEFAULT 0,
ADD COLUMN notes TEXT;

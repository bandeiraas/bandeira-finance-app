ALTER TABLE cards ADD COLUMN IF NOT EXISTS style text DEFAULT 'black';
UPDATE cards SET style = 'black' WHERE style IS NULL;

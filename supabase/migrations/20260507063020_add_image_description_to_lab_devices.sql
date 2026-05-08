/*
  # Add image and description to lab devices

  1. Modified Tables
    - `lab_devices`
      - `image_url` (text) - URL for device photo
      - `description` (text) - Description shown under the photo

  2. Notes
    - image_url defaults to empty string so existing rows are unaffected
    - description defaults to empty string
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lab_devices' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE lab_devices ADD COLUMN image_url text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lab_devices' AND column_name = 'description'
  ) THEN
    ALTER TABLE lab_devices ADD COLUMN description text DEFAULT '';
  END IF;
END $$;

/*
  # Create Cars Marketplace Database Schema

  1. New Tables
    - `cars`
      - `id` (uuid, primary key) - Unique identifier for each car
      - `make` (text) - Car manufacturer (e.g., Toyota, Ford, BMW)
      - `model` (text) - Car model name
      - `year` (integer) - Manufacturing year
      - `price` (numeric) - Listing price in USD
      - `mileage` (integer) - Total miles driven
      - `condition` (text) - 'new' or 'used'
      - `transmission` (text) - Transmission type (Automatic, Manual)
      - `fuel_type` (text) - Fuel type (Gasoline, Diesel, Electric, Hybrid)
      - `body_type` (text) - Body style (Sedan, SUV, Truck, Coupe, etc.)
      - `exterior_color` (text) - Exterior paint color
      - `interior_color` (text) - Interior color
      - `description` (text) - Detailed description of the car
      - `features` (text[]) - Array of features (e.g., Leather Seats, Sunroof)
      - `image_url` (text) - Primary image URL from Pexels
      - `location` (text) - City/State where car is located
      - `vin` (text, optional) - Vehicle Identification Number
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `cars` table
    - Add policy for public read access (anyone can browse cars)
    - Future: Add policies for authenticated sellers to manage their listings

  3. Indexes
    - Index on make, model for faster searches
    - Index on price for sorting
    - Index on condition for filtering
*/

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL CHECK (year >= 1900 AND year <= 2025),
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  mileage integer NOT NULL CHECK (mileage >= 0),
  condition text NOT NULL CHECK (condition IN ('new', 'used')),
  transmission text NOT NULL DEFAULT 'Automatic',
  fuel_type text NOT NULL DEFAULT 'Gasoline',
  body_type text NOT NULL,
  exterior_color text NOT NULL,
  interior_color text NOT NULL,
  description text NOT NULL,
  features text[] DEFAULT '{}',
  image_url text NOT NULL,
  location text NOT NULL,
  vin text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all cars
CREATE POLICY "Anyone can view cars"
  ON cars
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cars_make ON cars(make);
CREATE INDEX IF NOT EXISTS idx_cars_model ON cars(model);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_condition ON cars(condition);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_body_type ON cars(body_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
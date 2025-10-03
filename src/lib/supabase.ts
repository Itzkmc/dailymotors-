import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'new' | 'used';
  transmission: string;
  fuel_type: string;
  body_type: string;
  exterior_color: string;
  interior_color: string;
  description: string;
  features: string[];
  image_url: string;
  location: string;
  vin?: string;
  created_at: string;
  updated_at: string;
}

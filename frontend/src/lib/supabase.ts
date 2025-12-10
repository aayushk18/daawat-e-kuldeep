import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MenuItem = {
  id: string;
  name: string;
  name_hi: string;
  description: string;
  description_hi: string;
  category: string;
  price: number;
  image_url: string;
  spicy_level: number;
  is_veg: boolean;
  is_vegan: boolean;
  allergens: string[];
  calories: number;
  is_seasonal: boolean;
  season: string;
  is_available: boolean;
};

export type Review = {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  platform: string;
  created_at: string;
};

export type ChefSpecial = {
  id: string;
  dish_name: string;
  dish_name_hi: string;
  description: string;
  description_hi: string;
  price: number;
  image_url: string;
  day_of_week: number;
};

export type Event = {
  id: string;
  title: string;
  title_hi: string;
  description: string;
  description_hi: string;
  event_date: string;
  image_url: string;
  price_per_person: number;
  max_capacity: number;
};

export type BlogPost = {
  id: string;
  title: string;
  title_hi: string;
  content: string;
  content_hi: string;
  author: string;
  image_url: string;
  published_at: string;
};

export type GalleryPhoto = {
  id: string;
  image_url: string;
  caption: string;
  customer_name: string;
  instagram_handle: string;
};

export type Reservation = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  special_requests?: string;
};

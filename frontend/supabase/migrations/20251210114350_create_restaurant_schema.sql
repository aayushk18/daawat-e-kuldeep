/*
  # Daawat-e-Kuldeep Restaurant Database Schema

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text) - dish name
      - `name_hi` (text) - dish name in Hindi
      - `description` (text) - dish description
      - `description_hi` (text) - description in Hindi
      - `category` (text) - appetizer, main course, dessert, beverages
      - `price` (numeric) - price in rupees
      - `image_url` (text) - dish image
      - `spicy_level` (integer) - 0-5 scale
      - `is_veg` (boolean)
      - `is_vegan` (boolean)
      - `allergens` (text array) - list of allergens
      - `calories` (integer) - calorie count
      - `is_seasonal` (boolean)
      - `season` (text) - summer, winter, all
      - `is_available` (boolean)
      - `created_at` (timestamptz)

    - `reservations`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `party_size` (integer)
      - `reservation_date` (date)
      - `reservation_time` (time)
      - `special_requests` (text)
      - `status` (text) - pending, confirmed, cancelled
      - `created_at` (timestamptz)

    - `reviews`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `rating` (integer) - 1-5
      - `comment` (text)
      - `platform` (text) - google, zomato, website
      - `is_featured` (boolean)
      - `created_at` (timestamptz)

    - `chef_specials`
      - `id` (uuid, primary key)
      - `dish_name` (text)
      - `dish_name_hi` (text)
      - `description` (text)
      - `description_hi` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `day_of_week` (integer) - 0-6 (Sunday-Saturday)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `title_hi` (text)
      - `description` (text)
      - `description_hi` (text)
      - `event_date` (date)
      - `image_url` (text)
      - `price_per_person` (numeric)
      - `max_capacity` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `title_hi` (text)
      - `content` (text)
      - `content_hi` (text)
      - `author` (text)
      - `image_url` (text)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)

    - `gallery_photos`
      - `id` (uuid, primary key)
      - `image_url` (text)
      - `caption` (text)
      - `customer_name` (text)
      - `instagram_handle` (text)
      - `is_featured` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (restaurant website is public)
    - Add policies for authenticated admin write access
*/

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_hi text,
  description text NOT NULL,
  description_hi text,
  category text NOT NULL,
  price numeric NOT NULL,
  image_url text,
  spicy_level integer DEFAULT 0,
  is_veg boolean DEFAULT true,
  is_vegan boolean DEFAULT false,
  allergens text[] DEFAULT ARRAY[]::text[],
  calories integer,
  is_seasonal boolean DEFAULT false,
  season text DEFAULT 'all',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available menu items"
  ON menu_items FOR SELECT
  USING (is_available = true);

CREATE POLICY "Authenticated users can manage menu items"
  ON menu_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  party_size integer NOT NULL,
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  special_requests text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  platform text DEFAULT 'website',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view featured reviews"
  ON reviews FOR SELECT
  USING (is_featured = true);

CREATE POLICY "Anyone can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Chef Specials Table
CREATE TABLE IF NOT EXISTS chef_specials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dish_name text NOT NULL,
  dish_name_hi text,
  description text NOT NULL,
  description_hi text,
  price numeric NOT NULL,
  image_url text,
  day_of_week integer CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chef_specials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active chef specials"
  ON chef_specials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage chef specials"
  ON chef_specials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_hi text,
  description text NOT NULL,
  description_hi text,
  event_date date NOT NULL,
  image_url text,
  price_per_person numeric,
  max_capacity integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage events"
  ON events FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_hi text,
  content text NOT NULL,
  content_hi text,
  author text NOT NULL,
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (published_at <= now());

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Gallery Photos Table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  customer_name text,
  instagram_handle text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view featured gallery photos"
  ON gallery_photos FOR SELECT
  USING (is_featured = true);

CREATE POLICY "Authenticated users can manage gallery photos"
  ON gallery_photos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
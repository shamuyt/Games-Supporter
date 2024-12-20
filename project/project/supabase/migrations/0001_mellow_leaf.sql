/*
  # Support Ticket System Tables

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `status` (text): 'open', 'in_progress', 'resolved', 'closed'
      - `priority` (text): 'low', 'medium', 'high'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ticket_responses`
      - `id` (uuid, primary key)
      - `ticket_id` (uuid, references tickets)
      - `user_id` (uuid, references auth.users)
      - `message` (text)
      - `is_staff_response` (boolean)
      - `created_at` (timestamp)
    
  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their tickets
    - Add policies for staff to manage all tickets
*/

-- Ticket status enum
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high');

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  status ticket_status DEFAULT 'open',
  priority ticket_priority DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ticket responses table
CREATE TABLE IF NOT EXISTS ticket_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  message text NOT NULL,
  is_staff_response boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_responses ENABLE ROW LEVEL SECURITY;

-- Policies for tickets
CREATE POLICY "Users can view own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for responses
CREATE POLICY "Users can view responses to their tickets"
  ON ticket_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tickets 
      WHERE tickets.id = ticket_id 
      AND tickets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add responses to their tickets"
  ON ticket_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tickets 
      WHERE tickets.id = ticket_id 
      AND tickets.user_id = auth.uid()
    )
  );
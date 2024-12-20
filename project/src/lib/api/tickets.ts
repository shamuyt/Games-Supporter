import { supabase } from '../supabase';
import type { Ticket, TicketResponse } from '../types/tickets';

export const createTicket = async (
  title: string,
  description: string,
  priority: Ticket['priority']
): Promise<Ticket> => {
  const { data, error } = await supabase
    .from('tickets')
    .insert({ title, description, priority })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTickets = async (): Promise<Ticket[]> => {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getTicketResponses = async (ticketId: string): Promise<TicketResponse[]> => {
  const { data, error } = await supabase
    .from('ticket_responses')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const addTicketResponse = async (
  ticketId: string,
  message: string
): Promise<TicketResponse> => {
  const { data, error } = await supabase
    .from('ticket_responses')
    .insert({ ticket_id: ticketId, message })
    .select()
    .single();

  if (error) throw error;
  return data;
};
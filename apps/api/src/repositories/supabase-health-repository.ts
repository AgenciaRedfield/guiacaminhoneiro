import { supabaseAdmin } from "../config/supabase.js";

export class SupabaseHealthRepository {
  async isAvailable() {
    return Boolean(supabaseAdmin);
  }
}

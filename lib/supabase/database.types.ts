/**
 * Placeholder Database types until Phase 4C migrations exist.
 *
 * Do not hand-write application tables here. After Migration 1, regenerate:
 *
 *   npx supabase gen types --local --lang typescript > lib/supabase/database.types.ts
 *
 * Hosted (once a project is linked):
 *
 *   npx supabase gen types --linked --lang typescript > lib/supabase/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

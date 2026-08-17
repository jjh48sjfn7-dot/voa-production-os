export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      church_workspaces: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          production_os_key: string | null
          slug: string
          timezone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          production_os_key?: string | null
          slug: string
          timezone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          production_os_key?: string | null
          slug?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      department_assignments: {
        Row: {
          assigned_at: string
          created_at: string
          growth_level: Database["public"]["Enums"]["department_growth_level"]
          growth_level_entered_at: string
          id: string
          is_active: boolean
          membership_id: string
          updated_at: string
          workspace_department_id: string
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          growth_level?: Database["public"]["Enums"]["department_growth_level"]
          growth_level_entered_at?: string
          id?: string
          is_active?: boolean
          membership_id: string
          updated_at?: string
          workspace_department_id: string
        }
        Update: {
          assigned_at?: string
          created_at?: string
          growth_level?: Database["public"]["Enums"]["department_growth_level"]
          growth_level_entered_at?: string
          id?: string
          is_active?: boolean
          membership_id?: string
          updated_at?: string
          workspace_department_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "department_assignments_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "team_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_assignments_workspace_department_id_fkey"
            columns: ["workspace_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      leadership_appointments: {
        Row: {
          appointed_at: string
          appointed_by_membership_id: string | null
          created_at: string
          id: string
          membership_id: string
          removed_at: string | null
          role_key: Database["public"]["Enums"]["leadership_role_key"]
          workspace_department_id: string | null
        }
        Insert: {
          appointed_at?: string
          appointed_by_membership_id?: string | null
          created_at?: string
          id?: string
          membership_id: string
          removed_at?: string | null
          role_key: Database["public"]["Enums"]["leadership_role_key"]
          workspace_department_id?: string | null
        }
        Update: {
          appointed_at?: string
          appointed_by_membership_id?: string | null
          created_at?: string
          id?: string
          membership_id?: string
          removed_at?: string | null
          role_key?: Database["public"]["Enums"]["leadership_role_key"]
          workspace_department_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leadership_appointments_appointed_by_membership_id_fkey"
            columns: ["appointed_by_membership_id"]
            isOneToOne: false
            referencedRelation: "team_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leadership_appointments_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "team_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leadership_appointments_workspace_department_id_fkey"
            columns: ["workspace_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_grants: {
        Row: {
          granted_at: string
          granted_by_membership_id: string | null
          id: string
          membership_id: string
          permission_key: Database["public"]["Enums"]["permission_key"]
          revoked_at: string | null
          workspace_department_id: string | null
        }
        Insert: {
          granted_at?: string
          granted_by_membership_id?: string | null
          id?: string
          membership_id: string
          permission_key: Database["public"]["Enums"]["permission_key"]
          revoked_at?: string | null
          workspace_department_id?: string | null
        }
        Update: {
          granted_at?: string
          granted_by_membership_id?: string | null
          id?: string
          membership_id?: string
          permission_key?: Database["public"]["Enums"]["permission_key"]
          revoked_at?: string | null
          workspace_department_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_grants_granted_by_membership_id_fkey"
            columns: ["granted_by_membership_id"]
            isOneToOne: false
            referencedRelation: "team_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_grants_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "team_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_grants_workspace_department_id_fkey"
            columns: ["workspace_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      position_prerequisites: {
        Row: {
          created_at: string
          position_id: string
          prerequisite_position_id: string
        }
        Insert: {
          created_at?: string
          position_id: string
          prerequisite_position_id: string
        }
        Update: {
          created_at?: string
          position_id?: string
          prerequisite_position_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "position_prerequisites_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "position_prerequisites_prerequisite_position_id_fkey"
            columns: ["prerequisite_position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      positions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          required_assisted_services: number
          required_shadow_services: number
          scheduling_guidance: string | null
          slug: string
          updated_at: string
          workspace_department_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          required_assisted_services?: number
          required_shadow_services?: number
          scheduling_guidance?: string | null
          slug: string
          updated_at?: string
          workspace_department_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          required_assisted_services?: number
          required_shadow_services?: number
          scheduling_guidance?: string | null
          slug?: string
          updated_at?: string
          workspace_department_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_workspace_department_id_fkey"
            columns: ["workspace_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team_invitation_departments: {
        Row: {
          created_at: string
          invitation_id: string
          workspace_department_id: string
        }
        Insert: {
          created_at?: string
          invitation_id: string
          workspace_department_id: string
        }
        Update: {
          created_at?: string
          invitation_id?: string
          workspace_department_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitation_departments_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "team_invitations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitation_departments_workspace_department_id_fkey"
            columns: ["workspace_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitation_permissions: {
        Row: {
          created_at: string
          id: string
          invitation_id: string
          permission_key: Database["public"]["Enums"]["permission_key"]
          workspace_department_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          invitation_id: string
          permission_key: Database["public"]["Enums"]["permission_key"]
          workspace_department_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          invitation_id?: string
          permission_key?: Database["public"]["Enums"]["permission_key"]
          workspace_department_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_invitation_permissions_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "team_invitations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitation_permissions_workspace_department_id_fkey"
            columns: ["workspace_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitations: {
        Row: {
          accepted_at: string | null
          accepted_user_id: string | null
          created_at: string
          email: string
          email_normalized: string | null
          expires_at: string
          id: string
          intended_leadership_department_id: string | null
          intended_leadership_role:
            | Database["public"]["Enums"]["leadership_role_key"]
            | null
          invited_by_membership_id: string
          status: Database["public"]["Enums"]["invitation_status"]
          token_hash: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_user_id?: string | null
          created_at?: string
          email: string
          email_normalized?: string | null
          expires_at: string
          id?: string
          intended_leadership_department_id?: string | null
          intended_leadership_role?:
            | Database["public"]["Enums"]["leadership_role_key"]
            | null
          invited_by_membership_id: string
          status?: Database["public"]["Enums"]["invitation_status"]
          token_hash: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          accepted_at?: string | null
          accepted_user_id?: string | null
          created_at?: string
          email?: string
          email_normalized?: string | null
          expires_at?: string
          id?: string
          intended_leadership_department_id?: string | null
          intended_leadership_role?:
            | Database["public"]["Enums"]["leadership_role_key"]
            | null
          invited_by_membership_id?: string
          status?: Database["public"]["Enums"]["invitation_status"]
          token_hash?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitations_accepted_user_id_fkey"
            columns: ["accepted_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitations_intended_leadership_department_id_fkey"
            columns: ["intended_leadership_department_id"]
            isOneToOne: false
            referencedRelation: "workspace_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitations_invited_by_membership_id_fkey"
            columns: ["invited_by_membership_id"]
            isOneToOne: false
            referencedRelation: "team_memberships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "church_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      team_memberships: {
        Row: {
          archived_at: string | null
          created_at: string
          id: string
          inactive_at: string | null
          joined_at: string | null
          status: Database["public"]["Enums"]["membership_status"]
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          id?: string
          inactive_at?: string | null
          joined_at?: string | null
          status: Database["public"]["Enums"]["membership_status"]
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          id?: string
          inactive_at?: string | null
          joined_at?: string | null
          status?: Database["public"]["Enums"]["membership_status"]
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_memberships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_memberships_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "church_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_departments: {
        Row: {
          created_at: string
          department_key: string
          id: string
          is_active: boolean
          name: string
          source: Database["public"]["Enums"]["department_source"]
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          department_key: string
          id?: string
          is_active?: boolean
          name: string
          source: Database["public"]["Enums"]["department_source"]
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          department_key?: string
          id?: string
          is_active?: boolean
          name?: string
          source?: Database["public"]["Enums"]["department_source"]
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_departments_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "church_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_team_invitation: {
        Args: { p_token_hash_hex: string }
        Returns: Database["public"]["CompositeTypes"]["invitation_accept_result"]
        SetofOptions: {
          from: "*"
          to: "invitation_accept_result"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      preview_team_invitation: {
        Args: { p_token_hash_hex: string }
        Returns: Database["public"]["CompositeTypes"]["invitation_preview_result"]
        SetofOptions: {
          from: "*"
          to: "invitation_preview_result"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      revoke_team_invitation: {
        Args: { p_invitation_id: string }
        Returns: Database["public"]["CompositeTypes"]["invitation_revoke_result"]
        SetofOptions: {
          from: "*"
          to: "invitation_revoke_result"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      department_growth_level:
        | "new_volunteer"
        | "learning"
        | "shadowing"
        | "assisted"
        | "ready_to_serve"
        | "advanced"
      department_source: "production_os" | "custom"
      invitation_status: "pending" | "accepted" | "expired" | "revoked"
      leadership_role_key: "production_overseer" | "department_overseer"
      membership_status: "invited" | "active" | "inactive" | "archived"
      permission_key:
        | "trainer"
        | "scheduler"
        | "department_editor"
        | "admin"
        | "builder"
    }
    CompositeTypes: {
      invitation_accept_result: {
        outcome: string | null
        workspace_name: string | null
      }
      invitation_preview_result: {
        state: string | null
        workspace_name: string | null
      }
      invitation_revoke_result: {
        outcome: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      department_growth_level: [
        "new_volunteer",
        "learning",
        "shadowing",
        "assisted",
        "ready_to_serve",
        "advanced",
      ],
      department_source: ["production_os", "custom"],
      invitation_status: ["pending", "accepted", "expired", "revoked"],
      leadership_role_key: ["production_overseer", "department_overseer"],
      membership_status: ["invited", "active", "inactive", "archived"],
      permission_key: [
        "trainer",
        "scheduler",
        "department_editor",
        "admin",
        "builder",
      ],
    },
  },
} as const

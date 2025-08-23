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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      analytics_daily: {
        Row: {
          active_conversations: number | null
          created_at: string
          date: string
          id: string
          messages_delivered: number | null
          messages_failed: number | null
          messages_read: number | null
          messages_sent: number | null
          new_contacts: number | null
          project_id: string
        }
        Insert: {
          active_conversations?: number | null
          created_at?: string
          date: string
          id?: string
          messages_delivered?: number | null
          messages_failed?: number | null
          messages_read?: number | null
          messages_sent?: number | null
          new_contacts?: number | null
          project_id: string
        }
        Update: {
          active_conversations?: number | null
          created_at?: string
          date?: string
          id?: string
          messages_delivered?: number | null
          messages_failed?: number | null
          messages_read?: number | null
          messages_sent?: number | null
          new_contacts?: number | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_daily_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_recipients: {
        Row: {
          campaign_id: string
          contact_id: string
          created_at: string
          delivered_at: string | null
          failed_reason: string | null
          id: string
          read_at: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["message_status"]
          whatsapp_message_id: string | null
        }
        Insert: {
          campaign_id: string
          contact_id: string
          created_at?: string
          delivered_at?: string | null
          failed_reason?: string | null
          id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          whatsapp_message_id?: string | null
        }
        Update: {
          campaign_id?: string
          contact_id?: string
          created_at?: string
          delivered_at?: string | null
          failed_reason?: string | null
          id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_recipients_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          completed_at: string | null
          created_at: string
          delivered_count: number | null
          description: string | null
          failed_count: number | null
          id: string
          name: string
          project_id: string
          read_count: number | null
          scheduled_at: string | null
          sent_count: number | null
          settings: Json | null
          started_at: string | null
          status: Database["public"]["Enums"]["campaign_status"]
          target_contacts_count: number | null
          template_id: string | null
          type: Database["public"]["Enums"]["campaign_type"]
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          id?: string
          name: string
          project_id: string
          read_count?: number | null
          scheduled_at?: string | null
          sent_count?: number | null
          settings?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          target_contacts_count?: number | null
          template_id?: string | null
          type?: Database["public"]["Enums"]["campaign_type"]
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          id?: string
          name?: string
          project_id?: string
          read_count?: number | null
          scheduled_at?: string | null
          sent_count?: number | null
          settings?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["campaign_status"]
          target_contacts_count?: number | null
          template_id?: string | null
          type?: Database["public"]["Enums"]["campaign_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_flows: {
        Row: {
          created_at: string
          description: string | null
          flow_data: Json
          id: string
          is_active: boolean
          name: string
          project_id: string
          trigger_keywords: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          flow_data?: Json
          id?: string
          is_active?: boolean
          name: string
          project_id: string
          trigger_keywords?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          flow_data?: Json
          id?: string
          is_active?: boolean
          name?: string
          project_id?: string
          trigger_keywords?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_flows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_list_members: {
        Row: {
          added_at: string
          contact_id: string
          contact_list_id: string
          id: string
        }
        Insert: {
          added_at?: string
          contact_id: string
          contact_list_id: string
          id?: string
        }
        Update: {
          added_at?: string
          contact_id?: string
          contact_list_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_list_members_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_list_members_contact_list_id_fkey"
            columns: ["contact_list_id"]
            isOneToOne: false
            referencedRelation: "contact_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_lists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_lists_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          custom_fields: Json | null
          email: string | null
          first_name: string | null
          id: string
          last_message_at: string | null
          last_name: string | null
          phone_number: string
          project_id: string
          status: Database["public"]["Enums"]["contact_status"]
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_fields?: Json | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_message_at?: string | null
          last_name?: string | null
          phone_number: string
          project_id: string
          status?: Database["public"]["Enums"]["contact_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_fields?: Json | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_message_at?: string | null
          last_name?: string | null
          phone_number?: string
          project_id?: string
          status?: Database["public"]["Enums"]["contact_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          body_text: string
          buttons: Json | null
          category: string
          created_at: string
          footer_text: string | null
          header_content: string | null
          header_type: string | null
          id: string
          language: string
          name: string
          project_id: string
          status: Database["public"]["Enums"]["template_status"]
          updated_at: string
          variables: Json | null
          whatsapp_template_id: string | null
        }
        Insert: {
          body_text: string
          buttons?: Json | null
          category: string
          created_at?: string
          footer_text?: string | null
          header_content?: string | null
          header_type?: string | null
          id?: string
          language?: string
          name: string
          project_id: string
          status?: Database["public"]["Enums"]["template_status"]
          updated_at?: string
          variables?: Json | null
          whatsapp_template_id?: string | null
        }
        Update: {
          body_text?: string
          buttons?: Json | null
          category?: string
          created_at?: string
          footer_text?: string | null
          header_content?: string | null
          header_type?: string | null
          id?: string
          language?: string
          name?: string
          project_id?: string
          status?: Database["public"]["Enums"]["template_status"]
          updated_at?: string
          variables?: Json | null
          whatsapp_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_templates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          campaign_id: string | null
          contact_id: string
          content: string | null
          created_at: string
          delivered_at: string | null
          direction: string
          id: string
          media_url: string | null
          message_type: string
          project_id: string
          read_at: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["message_status"] | null
          template_id: string | null
          whatsapp_conversation_id: string | null
          whatsapp_message_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          contact_id: string
          content?: string | null
          created_at?: string
          delivered_at?: string | null
          direction: string
          id?: string
          media_url?: string | null
          message_type: string
          project_id: string
          read_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["message_status"] | null
          template_id?: string | null
          whatsapp_conversation_id?: string | null
          whatsapp_message_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          contact_id?: string
          content?: string | null
          created_at?: string
          delivered_at?: string | null
          direction?: string
          id?: string
          media_url?: string | null
          message_type?: string
          project_id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["message_status"] | null
          template_id?: string | null
          whatsapp_conversation_id?: string | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          plan: Database["public"]["Enums"]["project_plan"]
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
          user_id: string
          whatsapp_business_id: string | null
          whatsapp_display_name: string | null
          whatsapp_phone_number: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          plan?: Database["public"]["Enums"]["project_plan"]
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          user_id: string
          whatsapp_business_id?: string | null
          whatsapp_display_name?: string | null
          whatsapp_phone_number?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          plan?: Database["public"]["Enums"]["project_plan"]
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          user_id?: string
          whatsapp_business_id?: string | null
          whatsapp_display_name?: string | null
          whatsapp_phone_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      campaign_status:
        | "draft"
        | "scheduled"
        | "running"
        | "completed"
        | "paused"
        | "cancelled"
      campaign_type: "broadcast" | "drip" | "triggered"
      contact_status: "active" | "blocked" | "opted_out"
      message_status: "sent" | "delivered" | "read" | "failed"
      project_plan: "Standard" | "Pro" | "Enterprise"
      project_status: "active" | "inactive" | "suspended"
      template_status: "draft" | "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
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
  public: {
    Enums: {
      campaign_status: [
        "draft",
        "scheduled",
        "running",
        "completed",
        "paused",
        "cancelled",
      ],
      campaign_type: ["broadcast", "drip", "triggered"],
      contact_status: ["active", "blocked", "opted_out"],
      message_status: ["sent", "delivered", "read", "failed"],
      project_plan: ["Standard", "Pro", "Enterprise"],
      project_status: ["active", "inactive", "suspended"],
      template_status: ["draft", "pending", "approved", "rejected"],
    },
  },
} as const

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      forms: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
        }
        Relationships: []
      }
      "launch-week-hackathon-8": {
        Row: {
          allowed_email: boolean | null
          user_id: string
        }
        Insert: {
          allowed_email?: boolean | null
          user_id: string
        }
        Update: {
          allowed_email?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "launch-week-hackathon-8_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "launch-week-hackathon-x": {
        Row: {
          allowed_email: boolean | null
          user_id: string
        }
        Insert: {
          allowed_email?: boolean | null
          user_id: string
        }
        Update: {
          allowed_email?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "launch-week-hackathon-x_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          email: string | null
          github_url: string | null
          id: string
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          team_info: Json[] | null
          title: string | null
          twitter: string | null
          url: string | null
        }
        Insert: {
          approved?: boolean | null
          categories?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          image_keys?: string[] | null
          images?: string[] | null
          instagram?: string | null
          slug?: string | null
          supabase_features?: string[] | null
          team_info?: Json[] | null
          title?: string | null
          twitter?: string | null
          url?: string | null
        }
        Update: {
          approved?: boolean | null
          categories?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          image_keys?: string[] | null
          images?: string[] | null
          instagram?: string | null
          slug?: string | null
          supabase_features?: string[] | null
          team_info?: Json[] | null
          title?: string | null
          twitter?: string | null
          url?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      views: {
        Row: {
          created_at: string | null
          id: string
          ip_address: string | null
          product_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          product_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "bring_the_func_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "flutter_hackathon_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "hackathon_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "hacktoberfest_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "holiday_hackdays_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "launch_week_5_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "launch_week_6_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "launch_week_7_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_view"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      bring_the_func_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      flutter_hackathon_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      hackathon_view: {
        Row: {
          categories: string[] | null
          id: string | null
        }
        Insert: {
          categories?: string[] | null
          id?: string | null
        }
        Update: {
          categories?: string[] | null
          id?: string | null
        }
        Relationships: []
      }
      hacktoberfest_count: {
        Row: {
          count: number | null
        }
        Relationships: []
      }
      hacktoberfest_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      holiday_hackdays_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      launch_week_5_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      launch_week_6_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      launch_week_7_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      products_view: {
        Row: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }
        Relationships: []
      }
      tags_view: {
        Row: {
          count: number | null
          tags: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_hacktoberfest_tags: {
        Args: Record<PropertyKey, never>
        Returns: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }[]
      }
      get_monthly:
        | {
            Args: {
              month_number: number
            }
            Returns: {
              approved: boolean | null
              categories: string[] | null
              created_at: string | null
              description: string | null
              github_url: string | null
              id: string | null
              image_keys: string[] | null
              images: string[] | null
              instagram: string | null
              slug: string | null
              supabase_features: string[] | null
              title: string | null
              twitter: string | null
              url: string | null
              views: number | null
            }[]
          }
        | {
            Args: {
              month_string: string
            }
            Returns: {
              approved: boolean | null
              categories: string[] | null
              created_at: string | null
              description: string | null
              github_url: string | null
              id: string | null
              image_keys: string[] | null
              images: string[] | null
              instagram: string | null
              slug: string | null
              supabase_features: string[] | null
              title: string | null
              twitter: string | null
              url: string | null
              views: number | null
            }[]
          }
      get_related_products: {
        Args: {
          parent_id: string
        }
        Returns: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }[]
      }
      get_related_products_v2: {
        Args: {
          product_slug: string
        }
        Returns: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }[]
      }
      get_search_result: {
        Args: {
          search_term: string
        }
        Returns: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }[]
      }
      get_supabase_tags: {
        Args: {
          tag: string
        }
        Returns: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }[]
      }
      get_tags: {
        Args: {
          tag: string
        }
        Returns: {
          approved: boolean | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          github_url: string | null
          id: string | null
          image_keys: string[] | null
          images: string[] | null
          instagram: string | null
          slug: string | null
          supabase_features: string[] | null
          title: string | null
          twitter: string | null
          url: string | null
          views: number | null
        }[]
      }
      hacktoberfest_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      submission_count: {
        Args: {
          tag: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

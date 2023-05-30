export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
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
          images?: string[] | null
          instagram?: string | null
          slug?: string | null
          supabase_features?: string[] | null
          team_info?: Json[] | null
          title?: string | null
          twitter?: string | null
          url?: string | null
        }
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
      }
      hacktoberfest_count: {
        Row: {
          count: number | null
        }
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
      }
      products_view: {
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
      }
      tags_view: {
        Row: {
          count: number | null
          tags: string | null
        }
      }
    }
    Functions: {
      delete_file: {
        Args: {
          bucket: string
          pathname: string
        }
        Returns: string
      }
      get_hacktoberfest_tags: {
        Args: Record<PropertyKey, never>
        Returns: {
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
        }[]
      }
      get_monthly:
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
          month_number: number
        }
        Returns: {
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

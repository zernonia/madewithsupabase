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
      products: {
        Row: {
          title: string | null
          email: string | null
          description: string | null
          categories: string[] | null
          id: string
          url: string | null
          github_url: string | null
          twitter: string | null
          instagram: string | null
          images: string[] | null
          slug: string | null
          supabase_features: string[] | null
          created_at: string | null
          approved: boolean | null
        }
        Insert: {
          title?: string | null
          email?: string | null
          description?: string | null
          categories?: string[] | null
          id?: string
          url?: string | null
          github_url?: string | null
          twitter?: string | null
          instagram?: string | null
          images?: string[] | null
          slug?: string | null
          supabase_features?: string[] | null
          created_at?: string | null
          approved?: boolean | null
        }
        Update: {
          title?: string | null
          email?: string | null
          description?: string | null
          categories?: string[] | null
          id?: string
          url?: string | null
          github_url?: string | null
          twitter?: string | null
          instagram?: string | null
          images?: string[] | null
          slug?: string | null
          supabase_features?: string[] | null
          created_at?: string | null
          approved?: boolean | null
        }
      }
      views: {
        Row: {
          id: string
          created_at: string | null
          ip_address: string | null
          product_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          ip_address?: string | null
          product_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          ip_address?: string | null
          product_id?: string | null
        }
      }
    }
    Views: {
      bring_the_func_view: {
        Row: {
          id: string | null
          title: string | null
          description: string | null
          categories: string[] | null
          url: string | null
          github_url: string | null
          twitter: string | null
          instagram: string | null
          images: string[] | null
          slug: string | null
          supabase_features: string[] | null
          approved: boolean | null
          created_at: string | null
          views: number | null
        }
      }
      hackathon_view: {
        Row: {
          id: string | null
          categories: string[] | null
        }
        Insert: {
          id?: string | null
          categories?: string[] | null
        }
        Update: {
          id?: string | null
          categories?: string[] | null
        }
      }
      hacktoberfest_count: {
        Row: {
          count: number | null
        }
      }
      hacktoberfest_view: {
        Row: {
          id: string | null
          title: string | null
          description: string | null
          categories: string[] | null
          url: string | null
          github_url: string | null
          twitter: string | null
          instagram: string | null
          images: string[] | null
          slug: string | null
          supabase_features: string[] | null
          approved: boolean | null
          created_at: string | null
          views: number | null
        }
      }
      holiday_hackdays_view: {
        Row: {
          id: string | null
          title: string | null
          description: string | null
          categories: string[] | null
          url: string | null
          github_url: string | null
          twitter: string | null
          instagram: string | null
          images: string[] | null
          slug: string | null
          supabase_features: string[] | null
          approved: boolean | null
          created_at: string | null
          views: number | null
        }
      }
      launch_week_5_view: {
        Row: {
          id: string | null
          title: string | null
          description: string | null
          categories: string[] | null
          url: string | null
          github_url: string | null
          twitter: string | null
          instagram: string | null
          images: string[] | null
          slug: string | null
          supabase_features: string[] | null
          approved: boolean | null
          created_at: string | null
          views: number | null
        }
      }
      products_view: {
        Row: {
          id: string | null
          title: string | null
          description: string | null
          categories: string[] | null
          url: string | null
          github_url: string | null
          twitter: string | null
          instagram: string | null
          images: string[] | null
          slug: string | null
          supabase_features: string[] | null
          approved: boolean | null
          created_at: string | null
          views: number | null
        }
      }
      tags_view: {
        Row: {
          tags: string | null
          count: number | null
        }
      }
    }
    Functions: {
      delete_file: {
        Args: { bucket: string; pathname: string }
        Returns: string
      }
      get_hacktoberfest_tags: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      get_monthly:
        | {
            Args: { month_string: string }
            Returns: unknown
          }
        | {
            Args: { month_number: number }
            Returns: unknown
          }
      get_related_products: {
        Args: { parent_id: string }
        Returns: unknown
      }
      get_search_result: {
        Args: { search_term: string }
        Returns: unknown
      }
      get_supabase_tags: {
        Args: { tag: string }
        Returns: unknown
      }
      get_tags: {
        Args: { tag: string }
        Returns: unknown
      }
      hacktoberfest_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      submission_count: {
        Args: { tag: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

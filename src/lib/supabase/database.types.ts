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
    PostgrestVersion: "14.5"
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
      avisos_drop: {
        Row: {
          created_at: string
          drop_id: string | null
          email: string
          id: string
          telefono: string | null
        }
        Insert: {
          created_at?: string
          drop_id?: string | null
          email: string
          id?: string
          telefono?: string | null
        }
        Update: {
          created_at?: string
          drop_id?: string | null
          email?: string
          id?: string
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "avisos_drop_drop_id_fkey"
            columns: ["drop_id"]
            isOneToOne: false
            referencedRelation: "drops"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          apellidos: string | null
          created_at: string
          email: string | null
          id: string
          nombre: string | null
          telefono: string | null
          updated_at: string
        }
        Insert: {
          apellidos?: string | null
          created_at?: string
          email?: string | null
          id: string
          nombre?: string | null
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          apellidos?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nombre?: string | null
          telefono?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      direcciones: {
        Row: {
          alias: string | null
          cliente_id: string
          codigo_postal: string | null
          created_at: string
          departamento: string
          destinatario: string
          direccion: string
          distrito: string
          es_predeterminada: boolean
          id: string
          pais: string
          provincia: string | null
          referencia: string | null
          telefono: string
        }
        Insert: {
          alias?: string | null
          cliente_id: string
          codigo_postal?: string | null
          created_at?: string
          departamento: string
          destinatario: string
          direccion: string
          distrito: string
          es_predeterminada?: boolean
          id?: string
          pais?: string
          provincia?: string | null
          referencia?: string | null
          telefono: string
        }
        Update: {
          alias?: string | null
          cliente_id?: string
          codigo_postal?: string | null
          created_at?: string
          departamento?: string
          destinatario?: string
          direccion?: string
          distrito?: string
          es_predeterminada?: boolean
          id?: string
          pais?: string
          provincia?: string | null
          referencia?: string | null
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "direcciones_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      drops: {
        Row: {
          concepto: string | null
          created_at: string
          estado: string
          fecha_lanzamiento: string | null
          id: string
          nombre: string
        }
        Insert: {
          concepto?: string | null
          created_at?: string
          estado?: string
          fecha_lanzamiento?: string | null
          id?: string
          nombre: string
        }
        Update: {
          concepto?: string | null
          created_at?: string
          estado?: string
          fecha_lanzamiento?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      pedido_items: {
        Row: {
          cantidad: number
          color_snapshot: string | null
          created_at: string
          id: string
          imagen_snapshot: string | null
          nombre_snapshot: string
          pedido_id: string
          precio_unitario_pen: number
          producto_id: string | null
          sku_snapshot: string | null
          subtotal_pen: number | null
          talla_snapshot: string | null
        }
        Insert: {
          cantidad: number
          color_snapshot?: string | null
          created_at?: string
          id?: string
          imagen_snapshot?: string | null
          nombre_snapshot: string
          pedido_id: string
          precio_unitario_pen: number
          producto_id?: string | null
          sku_snapshot?: string | null
          subtotal_pen?: number | null
          talla_snapshot?: string | null
        }
        Update: {
          cantidad?: number
          color_snapshot?: string | null
          created_at?: string
          id?: string
          imagen_snapshot?: string | null
          nombre_snapshot?: string
          pedido_id?: string
          precio_unitario_pen?: number
          producto_id?: string | null
          sku_snapshot?: string | null
          subtotal_pen?: number | null
          talla_snapshot?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedido_items_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_items_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          cliente_id: string | null
          created_at: string
          cupon: string | null
          descuento_pen: number
          direccion_envio: Json | null
          envio_pen: number
          estado: string
          id: string
          invitado_email: string | null
          invitado_nombre: string | null
          invitado_telefono: string | null
          metodo_pago: string
          notas: string | null
          numero_pedido: string
          subtotal_pen: number
          total_pen: number
          updated_at: string
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          cupon?: string | null
          descuento_pen?: number
          direccion_envio?: Json | null
          envio_pen?: number
          estado?: string
          id?: string
          invitado_email?: string | null
          invitado_nombre?: string | null
          invitado_telefono?: string | null
          metodo_pago: string
          notas?: string | null
          numero_pedido: string
          subtotal_pen?: number
          total_pen?: number
          updated_at?: string
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          cupon?: string | null
          descuento_pen?: number
          direccion_envio?: Json | null
          envio_pen?: number
          estado?: string
          id?: string
          invitado_email?: string | null
          invitado_nombre?: string | null
          invitado_telefono?: string | null
          metodo_pago?: string
          notas?: string | null
          numero_pedido?: string
          subtotal_pen?: number
          total_pen?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          color: string | null
          created_at: string
          descripcion: string | null
          descripcion_en: string | null
          drop_id: string | null
          estado: string
          id: string
          imagen_url: string | null
          imagenes_url: string[] | null
          nombre: string
          precio_venta: number | null
          sku: string | null
          slug: string | null
          stock: number
          stock_minimo: number
          talla: string
          tipo: string
          variantes: Json | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          descripcion?: string | null
          descripcion_en?: string | null
          drop_id?: string | null
          estado?: string
          id?: string
          imagen_url?: string | null
          imagenes_url?: string[] | null
          nombre: string
          precio_venta?: number | null
          sku?: string | null
          slug?: string | null
          stock?: number
          stock_minimo?: number
          talla: string
          tipo: string
          variantes?: Json | null
        }
        Update: {
          color?: string | null
          created_at?: string
          descripcion?: string | null
          descripcion_en?: string | null
          drop_id?: string | null
          estado?: string
          id?: string
          imagen_url?: string | null
          imagenes_url?: string[] | null
          nombre?: string
          precio_venta?: number | null
          sku?: string | null
          slug?: string | null
          stock?: number
          stock_minimo?: number
          talla?: string
          tipo?: string
          variantes?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_drop_id_fkey"
            columns: ["drop_id"]
            isOneToOne: false
            referencedRelation: "drops"
            referencedColumns: ["id"]
          },
        ]
      }
      reclamaciones: {
        Row: {
          apellidos: string
          bien_contratado: string | null
          created_at: string
          departamento: string | null
          descripcion: string
          direccion: string | null
          distrito: string | null
          documento_numero: string | null
          documento_tipo: string | null
          email: string
          estado: string
          id: string
          monto_pen: number | null
          nombres: string
          numero: string
          pedido_referencia: string | null
          telefono: string | null
          tipo: string
        }
        Insert: {
          apellidos: string
          bien_contratado?: string | null
          created_at?: string
          departamento?: string | null
          descripcion: string
          direccion?: string | null
          distrito?: string | null
          documento_numero?: string | null
          documento_tipo?: string | null
          email: string
          estado?: string
          id?: string
          monto_pen?: number | null
          nombres: string
          numero?: string
          pedido_referencia?: string | null
          telefono?: string | null
          tipo: string
        }
        Update: {
          apellidos?: string
          bien_contratado?: string | null
          created_at?: string
          departamento?: string | null
          descripcion?: string
          direccion?: string | null
          distrito?: string | null
          documento_numero?: string | null
          documento_tipo?: string | null
          email?: string
          estado?: string
          id?: string
          monto_pen?: number | null
          nombres?: string
          numero?: string
          pedido_referencia?: string | null
          telefono?: string | null
          tipo?: string
        }
        Relationships: []
      }
      resenias: {
        Row: {
          aprobada: boolean
          autor: string | null
          cliente_id: string
          created_at: string
          estrellas: number
          foto_url: string | null
          id: string
          producto_id: string
          texto: string
          updated_at: string
        }
        Insert: {
          aprobada?: boolean
          autor?: string | null
          cliente_id: string
          created_at?: string
          estrellas: number
          foto_url?: string | null
          id?: string
          producto_id: string
          texto: string
          updated_at?: string
        }
        Update: {
          aprobada?: boolean
          autor?: string | null
          cliente_id?: string
          created_at?: string
          estrellas?: number
          foto_url?: string | null
          id?: string
          producto_id?: string
          texto?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resenias_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resenias_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      crear_pedido: {
        Args: {
          p_cupon?: string
          p_descuento_pen?: number
          p_direccion_envio: Json
          p_envio_pen?: number
          p_invitado?: Json
          p_items: Json
          p_metodo_pago: string
          p_notas?: string
        }
        Returns: {
          id: string
          numero_pedido: string
          total_pen: number
        }[]
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
    Enums: {},
  },
} as const

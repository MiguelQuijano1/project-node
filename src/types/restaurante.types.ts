// ─────────────────────────────────────────────────────────
// UNION TYPES — Día 3
// ─────────────────────────────────────────────────────────

export type EstadoPlato = 'disponible' | 'agotado' | 'suspendido'

export type ResultadoOperacion<T> =
  | { ok: true; datos: T }
  | { ok: false; error: string }

// ─────────────────────────────────────────────────────────
// ENUMS — Valores fijos del restaurante
// ─────────────────────────────────────────────────────────

export enum Categoria {
  ENTRADA = 'Entradas',
  PRINCIPAL = 'Segundos',
  POSTRE = 'Postres',
  BEBIDA = 'Bebidas'
}

// ─────────────────────────────────────────────────────────
// INTERFACES — Modelos del restaurante
// ─────────────────────────────────────────────────────────

export interface Plato {
  _id: string
  nombre: string
  descripcion: string
  categoria: Categoria
  precio: number
  createdAt: string
  updatedAt: string
}

export interface CreatePlatoDto {
  nombre: string
  descripcion: string
  categoria: Categoria
  precio: number
}

export interface UpdatePlatoDto {
  nombre?: string
  descripcion?: string
  categoria?: Categoria
  precio?: number
}

export interface PlatoResponseDto extends Plato { }

// ─────────────────────────────────────────────────────────
// USUARIOS
// ─────────────────────────────────────────────────────────

export interface User {
  _id: string
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  token: string
  message: string
}

// ─────────────────────────────────────────────────────────
// AUTH — Middleware
// ─────────────────────────────────────────────────────────

import { Request } from 'express'

export interface RestaurantePayload {
  email: string
  iat?: number
  exp?: number
}

export function esRestaurantePayload(
  valor: unknown
): valor is RestaurantePayload {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    'email' in valor &&
    typeof (valor as RestaurantePayload).email === 'string'
  )
}

export interface AuthRequest extends Request {
  user?: RestaurantePayload
}
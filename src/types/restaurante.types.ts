// ─────────────────────────────────────────────────────────
// ENUMS — Valores fijos del restaurante
// Un enum garantiza que solo los valores definidos aquí
// pueden usarse como categoría.
// ─────────────────────────────────────────────────────────

export enum Categoria {
  ENTRADA   = 'Entradas',
  PRINCIPAL = 'Segundos',
  POSTRE    = 'Postres',
  BEBIDA    = 'Bebidas'
}

// ─────────────────────────────────────────────────────────
// INTERFACES — Modelos del restaurante
// ─────────────────────────────────────────────────────────

// Modelo completo de un plato (lo que devuelve MongoDB)
export interface Plato {
  _id:         string
  nombre:      string
  descripcion: string
  categoria:   Categoria
  precio:      number
  createdAt:   string
  updatedAt:   string
}

// 📥 Lo que envía el cliente (POST)
export interface CreatePlatoDto {
  nombre:      string
  descripcion: string
  categoria:   Categoria
  precio:      number
}

// 🔥 NUEVO — para PUT (campos opcionales)
export interface UpdatePlatoDto {
  nombre?:      string
  descripcion?: string
  categoria?:   Categoria
  precio?:      number
}

// 🔥 IMPORTANTE — usar extends (Día 2)
export interface PlatoResponseDto extends Plato {
  // hereda todo de Plato
}

// ─────────────────────────────────────────────────────────
// USUARIOS
// ─────────────────────────────────────────────────────────

export interface User {
  _id:      string
  email:    string
  password: string
}

export interface RegisterDto {
  email:    string
  password: string
}

export interface LoginDto {
  email:    string
  password: string
}

export interface LoginResponseDto {
  token:   string
  message: string
}

// ─────────────────────────────────────────────────────────
// 🔐 AUTH — Middleware (Día 2)
// ─────────────────────────────────────────────────────────

import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

// Extiende Request para incluir el usuario del token
export interface AuthRequest extends Request {
  user?: JwtPayload | string
}
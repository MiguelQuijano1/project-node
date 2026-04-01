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
// Protegen los datos EN el código, antes de que lleguen
// a la base de datos.
// ─────────────────────────────────────────────────────────

// Modelo completo de un plato (lo que devuelve MongoDB)
export interface Plato {
  _id:         string      // generado por MongoDB
  nombre:      string
  descripcion: string      // campo opcional del schema real
  categoria:   Categoria   // restringido al enum
  precio:      number
  createdAt:   string      // por timestamps: true
  updatedAt:   string      // por timestamps: true
}

// 📥 Lo que envía el cliente al crear un plato (POST /menu)
export interface CreatePlatoDto {
  nombre:      string
  descripcion: string
  categoria:   Categoria
  precio:      number
  // Sin _id ni disponible — los genera el servidor
}

// 📤 Lo que devuelve el servidor al cliente (GET /menu)
export interface PlatoResponseDto {
  _id:         string
  nombre:      string
  descripcion: string
  categoria:   Categoria
  precio:      number
  createdAt:   string
  updatedAt:   string
}

// Modelo completo de un usuario (lo que guarda MongoDB)
export interface User {
  _id:      string
  email:    string
  password: string  // siempre hasheado, NUNCA texto plano
}

// 📥 Lo que envía el cliente al registrarse (POST /auth/register)
export interface RegisterDto {
  email:    string
  password: string
}

// 📥 Lo que envía el cliente al iniciar sesión (POST /auth/login)
export interface LoginDto {
  email:    string
  password: string
}

// 📤 Lo que devuelve el servidor al hacer login exitoso
export interface LoginResponseDto {
  token:   string
  message: string
}

import { Categoria, Plato, PlatoResponseDto } from './restaurante.types'

// ✅ Usando el enum correctamente
const categoriaDeHoy: Categoria = Categoria.PRINCIPAL
console.log(categoriaDeHoy)  // imprime: 'Segundos'

// Ver todos los valores disponibles
const todasLasCategorias = Object.values(Categoria)
console.log(todasLasCategorias)
// ['Entradas', 'Segundos', 'Postres', 'Bebidas']

// ✅ Objeto de prueba — CreatePlatoDto (lo que llega del cliente)
const platoNuevo = {
  nombre:      'Lomo Saltado',
  descripcion: 'Clásico plato peruano salteado',
  categoria:   Categoria.PRINCIPAL,
  precio:      28
}
console.log('Plato nuevo (sin _id):', platoNuevo)

// ✅ Objeto de prueba — PlatoResponseDto (lo que devuelve el servidor)
const platoRespuesta: PlatoResponseDto = {
  _id:         '665f1a2b3c4d5e6f7a8b9c0d',
  nombre:      'Lomo Saltado',
  descripcion: 'Clásico plato peruano salteado',
  categoria:   Categoria.PRINCIPAL,
  precio:      28,
  createdAt:   '2024-05-18T14:30:00Z',
  updatedAt:   '2024-05-18T14:30:00Z'
}
console.log('Respuesta del servidor:', platoRespuesta)

// ❌ Descomenten para ver el error en acción:
// const categoriaInvalida: Categoria = 'seg'
// TypeScript marca error: 'seg' no es un valor del enum

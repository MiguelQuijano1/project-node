import { Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AuthRequest, esRestaurantePayload } from '../types/restaurante.types'
import { config } from '../config'

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header requerido' })
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Token no encontrado en el header' })
    return
  }

  try {
    const decoded = verify(token, config.jwtSecret)
    if (!esRestaurantePayload(decoded)) {
      res.status(401).json({ error: 'Payload del token inválido' })
      return
    }
    req.user = decoded
    next()
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Token inválido'
    res.status(401).json({ error: mensaje })
  }
}
import { Router } from "express";
import express from 'express';
import { getUsers,insertUser, loginUser  } from "../controller/users.controller.js";

const router = Router();
router.use(express.json());
// Agregar el prefijo "/api" a todas las rutas
router.use('/api', (req, res, next) => {
  // Middleware para agregar /api como prefijo a todas las rutas
  req.url = `/api${req.url}`;
  next();
});

// Rutas
router.get('/users', getUsers);
router.post('/users/register', insertUser); // Agrega la ruta POST para insertUser
router.post('/users/login',loginUser);

export default router;

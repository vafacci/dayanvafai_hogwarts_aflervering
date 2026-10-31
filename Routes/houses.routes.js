import { Router } from "express";
import * as housesController from '../controllers/houses.controller.js'

const router = Router();

router.get('/', housesController.getAllHouses);       // GET /houses
router.get('/:id', housesController.getHouseById);   // GET /houses/1

export default router;

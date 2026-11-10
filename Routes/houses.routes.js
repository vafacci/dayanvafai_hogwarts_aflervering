// HOUSES router – read only (R)
// server.js sends everything on /houses here, so we only write the rest of the path.
import { Router } from "express";
import * as housesController from '../controllers/houses.controller.js'

const router = Router();

// R – get all houses
router.get('/', housesController.getAllHouses);

// R – get one house (:id is a number, e.g. 1 = Gryffindor)
router.get('/:id', housesController.getHouseById);

export default router;

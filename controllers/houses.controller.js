import * as housesRepository from '../repositorys/houses.repository.js';


export async function getAllHouses (req, res) {

    try {
        const houses = await housesRepository.getAllHouses();
        res.status(200).json(houses);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error connecting to database" });
    }
}


export async function getHouseById (req, res) {

    try {
        const house = await housesRepository.getHouseById(req.params.id);
        if (!house){
        return res.status(404).send({ message: "House not found" });
        }
        res.status(200).json(house);
    }
    catch (error) {
        res.status(500).send({ message: "Error connecting to database" });
    }
}
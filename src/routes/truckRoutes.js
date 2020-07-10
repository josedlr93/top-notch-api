import { 
  getTrucks,
  addNewTruck, 
  getTruckWithID,
  updateTruck,
  deleteTruck
} from '../controllers/truckController.js';

 const truckRoutes = (app) => {
  app.route('/truck')
    .get(getTrucks)

    .post(addNewTruck);

  app.route('/truck/:truckID')
    .get(getTruckWithID)
    
    .put(updateTruck)

    .delete(deleteTruck);
};

export default truckRoutes;
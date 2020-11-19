export const getTrucks = (Truck) => {
  return Truck.find({});
};

export const addNewTruck = (Truck, data) => {
  let error;

  if (!data.truck_num) {
    error = new Error('key required: truck_num');
  }

  if (!data.plate_num) {
    error = new Error('key required: plate_num');
  }
  
  if (!data.vin) {
    error = new Error('key required: vin');
  }
  
  if (!('cdl_required' in data)) {
    error = new Error('key required: cdl_required');
  }

  if (error) {
    error.status = 400;
    throw error;
  }

  let newTruck = new Truck(data);
  return newTruck.save();
};

export const getTruckWithID = (Truck, truckID) => {
  return Truck.findById(truckID);
};

export const updateTruck = (Truck, truckID, data) => {
  return Truck.findOneAndUpdate(
    { _id: truckID },
    data,
    {
      new: true,
      useFindAndModify: false
    });
};

export const deleteTruck = (Truck, truckID) => {
  return Truck.findByIdAndDelete({ _id: truckID });
};
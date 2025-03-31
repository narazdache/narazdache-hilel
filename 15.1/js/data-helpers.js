function getCars() {
  return JSON.parse(localStorage.getItem('cars')) || [];
}
// {brand:'Ford', model: 'Focus', color: 'white', year: 2025, id: 1}
function getCarById(carId) {
  const allCars = getCars();

  const myCar = allCars.find(car => car.id == carId);

  return myCar;
}

function saveCar(car, action = 'add') {
  const allCars = getCars();
  if (action === 'add') {
    allCars.push(car);
  } else {
    updateCar(car, allCars);
  }
  localStorage.setItem('cars', JSON.stringify(allCars))
}

function updateCar(myCar, allCars) {
  const index = allCars.findIndex(car => car.id == myCar.id);

  allCars[index] = myCar;
}

function deleteCarById(carId) {
  const allCars = getCars();
  const index = allCars.findIndex(car => car.id == carId);

  allCars.splice(index, 1);
  localStorage.setItem('cars', JSON.stringify(allCars));
}

function getClients() {
  return JSON.parse(localStorage.getItem('clients')) || [];
}


/*

cars: [
  {
    brand,
    model,
    color,
    year,
    id,
  }
]




*/
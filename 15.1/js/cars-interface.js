// const carActions = {
//   view: viewCarDetails,
//   edit: editCarForm
// };

function createCarsInterface() {
  const parent = document.querySelector('.wrapper');
  generateAddButton(parent);
  generateGrid(parent);
}

function generateGrid(parent) {
  const data = getCars();

  const existingGrid = document.querySelector('.grid');
  if (existingGrid) {
    existingGrid.remove();
  }

  const gridElement = document.createElement('div');
  gridElement.classList.add('grid');
  generateGridHeader(gridElement);
  generateGridContent(gridElement, data);

  observeGridButtons(gridElement);

  parent.appendChild(gridElement);
}

function observeGridButtons(gridElement) {
  gridElement.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const buttonType = event.target.getAttribute('data-action');
    const carId = event.target.parentNode.getAttribute('data-id');
    
    // 1
    if (buttonType === 'view') {
      viewCarDetails(carId);
    } else if (buttonType === 'edit') {
      editCarForm(carId);
    } else if (buttonType === 'delete') {
      deleteCar(carId);
    }

    // 2
    // switch(buttonType) {
    //   case 'view':
    //     // viewCarDetails(carId);
    //     break;
    // }

    // 3
    // buttonType === 'view' && viewCarDetails(carId);
    // buttonType === 'edit' && editCarForm(carId);

    // 4
    // carActions[buttonType](carId);
  });
}

function generateGridHeader(parent) {
  parent.innerHTML = `
    <div class="row header-row">
      <div>Brand</div>
      <div>Model</div>
      <div>Color</div>
      <div>Year</div>
      <div>Operations</div>
    </div>
  `;
}

function generateGridContent(parent, cars) {
  for(let car of cars) {
    const row = `
      <div class="row car-row">
        <div>${car.brand}</div>
        <div>${car.model}</div>
        <div>${car.color}</div>
        <div>${car.year}</div>
        <div data-id="${car.id}">
          <button type="button" data-action="view">View</button>
          <button type="button" data-action="edit">Edit</button>
          <button type="button" data-action="delete">Delete</button>
        </div>
      </div>
    `;

    parent.innerHTML += row;
  }
}

function generateAddButton(parent) {
  const button = document.createElement('button');
  button.textContent = 'Add new car';
  button.classList.add('add-button');
  button.addEventListener('click', () => {
    const parent = document.querySelector('.wrapper');
    generateCarForm(parent)
  })
  parent.appendChild(button);
}

function hideCarForm() {
  document.querySelector('.wrapper').innerHTML = '';
}

function viewCarDetails(carId) {
  const car = getCarById(carId);
  if (!car) return;

  let detailsContainer = document.querySelector('.car-details');
  if (!detailsContainer) {
    detailsContainer = document.createElement('div');
    detailsContainer.classList.add('car-details');
    document.querySelector('.wrapper').appendChild(detailsContainer);
  }

  detailsContainer.innerHTML = `
    <h2>Car Details</h2>
    <p><strong>Brand:</strong> ${car.brand}</p>
    <p><strong>Model:</strong> ${car.model}</p>
    <p><strong>Color:</strong> ${car.color}</p>
    <p><strong>Year:</strong> ${car.year}</p>
    <p><strong>Complectation:</strong> ${car.complectation || 'N/A'}</p>
    <button class="close-details">Close</button>
  `;

  document.querySelector('.close-details').addEventListener('click', () => {
    detailsContainer.remove();
  });
}


function deleteCar(carId) {
  const modal = document.querySelector('.modal-overlay');
  modal.classList.remove('hidden');

  document.querySelector('.confirm-delete').onclick = () => {
    deleteCarById(carId);
    document.querySelector(`.car-row *[data-id="${carId}"]`).parentNode.remove();
    modal.classList.add('hidden');
  };

  document.querySelector('.cancel-delete').onclick = () => {
    modal.classList.add('hidden');
  };
}

function editCarForm(carId) {
  const parent = document.querySelector('.wrapper');
  generateCarForm(parent, carId);
}

function generateCarForm(parent, carId = '') {
  const car = carId ? getCarById(carId) : null;

  // const form = document.createElement('form');
  // for (let formItemKey in carFormConfig) {
  //   const itemElement = document.createElement(carFormConfig[formItemKey].tag);
  //   itemElement.setAttribute('type', carFormConfig[formItemKey].type);
  // form.appendChild(itemElement)
  // }


  const form = `
    <form name="car">
      <p>
        <input type="text" name="brand" placeholder="Enter brand" ${car ? `value="${car.brand}"` : ''}>
        <span class="error brand-error"></span>
      </p>
      <p>
        <input type="text" name="model" placeholder="Enter model" ${car ? `value="${car.model}"` : ''}>
        <span class="error model-error"></span>
      </p>
      <p>
        <input type="text" name="color" placeholder="Enter color" ${car ? `value="${car.color}"` : ''}>
        <span class="error color-error"></span>
      </p>
      <p>
        <input type="text" name="year" placeholder="Enter year" ${car ? `value="${car.year}"` : ''}>
        <span class="error year-error"></span>
      </p>
      <p>
        <input type="text" name="complectation" placeholder="Enter complectation name" ${car ? `value="${car.complectation}"` : ''}>
        <span class="error complectation-error"></span>
      </p>
      <p>
        <input type="hidden" name="carId" value="${carId}" />
        <button type="button">Save</button>
      </p>
    </form>
  `;

  parent.innerHTML = form;

  observeCarFormButton();
}

function observeCarFormButton() {
  document.querySelector('form[name="car"] button').addEventListener('click', () => {
    const form = document.forms.car;

    const car = {
      brand: form.brand.value,
      model: form.model.value,
      year: form.year.value,
      color: form.color.value,
      complectation: form.complectation.value,
    }

    const carId = form.carId.value;
    // 1 - validation
    if (isValid(carFormConfig, car)) {
      // 2 - create or edit
      if (carId) {
        car.id = carId;
        saveCar(car, 'edit');
      } else {
        const id = Date.now();
        car.id = id;
        saveCar(car);
      }

      hideCarForm();
      createCarsInterface();
    }

  });
}

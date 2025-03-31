const carFormConfig = {
  brand: {
    regExp: /^\w{3,10}$/i,
    errorSelector: '.brand-error',
    errorMessage: 'Brand is incorrect',
    // tag: 'input',
    // type: 'text',
    // placeholder: 'Enter brand',
  }
};

function isValid(config, obj) {
  let valid = true;
  
  for (let key in config) {
    if (!obj[key].match(config[key].regExp)) {
      document.querySelector(config[key].errorSelector).innerHTML = config[key].errorMessage;
      valid = false;
    } else {
      document.querySelector(config[key].errorSelector).innerHTML = '';
    }
  }

  return valid;
}
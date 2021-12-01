function addCommas(num) {
  const [strNum, strDec] = String(num).split('.');
  let subStrings = [];
  for (let i = strNum.length; i > 0; i -= 3){
    if (i / 3 < 1){
      subStrings.push(strNum.slice(0, i));
      break;
    }
    subStrings.push(strNum.slice(i-3, i));
  }
  return strDec ? subStrings.reverse().join(',') + '.' + strDec : subStrings.reverse().join(',');
}

function validateFormData(formData, schema){
  const validateRequired = (input) => (input !== null && input !== undefined && input !== "");
  const validateMinLength = (input, min) => (input.length >= min);
  const validateMaxLength = (input, max) => (input.length <= max);
  const validateType = (input, type) => (typeof input === type);
  const errors = {};
  for (let field of Object.keys(schema)){
    errors[field] = [];
    for (let validator of Object.keys(schema[field])){
      switch (validator){
        case "required":
          if (!validateRequired(formData[field])) errors[field].push("This field is required");
          break;
        case "minLength":
          if (!validateMinLength(formData[field], schema[field][validator])){
            errors[field].push(`This field's minimum length is ${schema[field][validator]}.`);
          }
          break;
        case "maxLength":
          if (!validateMaxLength(formData[field], schema[field][validator])){
            errors[field].push(`This field's maximum length is ${schema[field][validator]}.`);
          }
          break;
        case "type":
          if (!validateType(formData[field], schema[field][validator])){
            errors[field].push(`This field's must be of type ${schema[field][validator]}.`);
          }
          break;
        default:
          throw new Error(`Error: attempted to use unsupported validator: ${validator}`);
      }
    }
  }
  for (let field of Object.keys(errors)){
    if (errors[field].length < 1) delete errors[field];
  }
  return Object.keys(errors).length > 0 ? {errors, success : false } : { success: true };
}

export { addCommas, validateFormData }
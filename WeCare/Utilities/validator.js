exports.ValidateName = (name) => {
  return (name.trim().length >= 3 && name.trim().length <= 50);
};
exports.ValidatePassword = (password) => {
  return (password.trim().length >= 5 && password.trim().length <= 10);
};
exports.ValidateAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 20 && age <= 100;
};
exports.ValidateGender = (gender) => {
  return (gender === "M" || gender === "F");
};
exports.ValidateNumber = (number) => {
  return (Math.ceil(Math.log10(number + 1)) == 10);
};
exports.ValidateEmail = (email) => {
  const a = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return (a != null ? true : false);
};
exports.ValidatePincode = (pincode) => {
    return (Math.ceil(Math.log10(pincode + 1)) == 6);
}
exports.ValidateCity = (city)=> {
    return (city.trim().length >= 3 && city.trim().length <= 20);
}
exports.ValidateState = (state)=> {
    return (state.trim().length >= 3 && state.trim().length <= 20);
}
exports.ValidateCountry = (country)=> {
    return (country.trim().length >= 3 && country.trim().length <= 20);
}
exports.ValidateSpeciality = (speciality) => {
    return (speciality.trim().length >= 10 && speciality.trim().length <= 50);
}
exports.ValidateSlot = (slot) => {
    
}
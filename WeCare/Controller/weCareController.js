const e = require("express");
const Model = require("../Model/weCareSchema");
const Validator = require("../Utilities/validator");

exports.setupDb = async (req, res) => {
  try {
    const userStarterData = {
      userId: "0000",
      name: "Yash",
      password: "admin",
      dateOfBirth: "1996-01-01",
      gender: "M",
      mobileNumber: 9621572892,
      email: "yashnigam.p@gmail.com",
      pincode: 208020,
      city: "Kanpur",
      state: "Uttar Pradesh",
      country: "India",
    };
    const coachStarterData = {
      coachId: "0000",
      name: "Yash",
      password: "admin",
      dateOfBirth: "1996-01-01",
      gender: "M",
      mobileNumber: 9621572892,
      speciality: "Hockey",
    };
    const usernotes = await Model.UserModel.create(userStarterData);
    const coachNotes = await Model.CoachesModel.create(coachStarterData);
    res.status(201).json({
        "message":"Go ahead"
    })
    //console.log(usernotes);
  } catch (err) {
    console.log(err);
  }
};

exports.setupUser = async (req, res) => {
  try {
    if (!Validator.ValidateName(req.body.name)) {
      res.status(400).json({
        message: "Name should have minimum 3 and maximum 50 characters",
      });
    } else if (!Validator.ValidatePassword(req.body.password)) {
      res.status(400).json({
        message: "Password should have minimum 5 and maximum 10 characters",
      });
    } else if (!Validator.ValidateAge(req.body.dateOfBirth)) {
      res.status(400).json({
        message: "Age should be greater than 20 and less than 100",
      });
    } else if (!Validator.ValidateGender(req.body.gender)) {
      res.status(400).json({
        message: "Gender should be either M or F",
      });
    } else if (!Validator.ValidateNumber(req.body.mobileNumber)) {
      res.status(400).json({
        message: "Mobile Number should have 10 digits",
      });
    } else if (!Validator.ValidateEmail(req.body.email)) {
      res.status(400).json({
        message: "Email should be a valid one",
      });
    } else if (!Validator.ValidatePincode(req.body.pincode)) {
      res.status(400).json({
        message: "Pincode should have 6 digits",
      });
    } else if (!Validator.ValidateCity(req.body.city)) {
      res.status(400).json({
        message: "City should have minimum 3 and maximum 20 characters",
      });
    } else if (!Validator.ValidateState(req.body.state)) {
      res.status(400).json({
        message: "State should have minimum 3 and maximum 20 characters",
      });
    } else if (!Validator.ValidateCountry(req.body.country)) {
      res.status(400).json({
        message: "Country should have minimum 3 and maximum 20 characters",
      });
    } else {
      Model.UserModel.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          res.status(400).json({ message: "User exists with this email id" });
        } else {
          Model.UserModel.find()
            .sort({ userId: -1 })
            .limit(1)
            .then(async (a) => {
              if (a) {
                let id = "" + (parseInt(a[0].userId) + 1);
                id = ("0000" + id).slice(-4);
                console.log(req.body);
                const userData = {
                  userId: id,
                  name: req.body.name,
                  password: req.body.password,
                  dateOfBirth: req.body.dateOfBirth,
                  gender: req.body.gender,
                  mobileNumber: req.body.mobileNumber,
                  email: req.body.email,
                  pincode: req.body.pincode,
                  city: req.body.city,
                  state: req.body.state,
                  country: req.body.country,
                };

                const data = await Model.UserModel.create(userData);
                res.status(201).json({
                  message: "CI-" + id,
                });
                console.log("Data inserted", data);
              }
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userLogin = async (req, res) => {
  let id = req.body.id.slice(3);
  Model.UserModel.findOne({
    $and: [{ userId: id }, { password: req.body.password }],
  }).then((data) => {
    if (data) {
      res.status(200).send(true);
    } else {
      res.status(400).json({
        message: "Incorrect user id or password",
      });
    }
  });
};

exports.setupCoaches = async (req, res) => {
  try {
    if (!Validator.ValidateName(req.body.name)) {
      res.status(400).json({
        message: "Name should have minimum 3 and maximum 50 characters",
      });
    } else if (!Validator.ValidatePassword(req.body.password)) {
      res.status(400).json({
        message: "Password should have minimum 5 and maximum 10 characters",
      });
    } else if (!Validator.ValidateAge(req.body.dateOfBirth)) {
      res.status(400).json({
        message: "Age should be greater than 20 and less than 100",
      });
    } else if (!Validator.ValidateGender(req.body.gender)) {
      res.status(400).json({
        message: "Gender should be either M or F",
      });
    } else if (!Validator.ValidateNumber(req.body.mobileNumber)) {
      res.status(400).json({
        message: "Mobile Number should have 10 digits",
      });
    } else if (!Validator.ValidateSpeciality(req.body.speciality)) {
      res.status(400).json({
        message: "Specialty should have 10 to 50 characters",
      });
    } else {
      Model.CoachesModel.findOne({ name: req.body.name }).then((user) => {
        if (user) {
          res.status(400).json({
            message: "Coach exists with this name",
          });
        } else {
          Model.CoachesModel.find()
            .sort({ coachId: -1 })
            .limit(1)
            .then(async (coach) => {
              if (coach) {
                let id = "" + (parseInt(coach[0].coachId) + 1);
                id = ("0000" + id).slice(-4);
                const coachData = {
                  coachId: id,
                  name: req.body.name,
                  password: req.body.password,
                  dateOfBirth: req.body.dateOfBirth,
                  gender: req.body.gender,
                  mobileNumber: req.body.mobileNumber,
                  speciality: req.body.speciality,
                };
                const data = await Model.CoachesModel.create(coachData);
                res.status(201).json({
                  message: "UI-" + id,
                });
              }
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.coachLogin = async (req, res) => {
    let id = req.body.id.slice(3);
    Model.CoachesModel.findOne({
      $and: [{ coachId: id }, { password: req.body.password }],
    }).then((data) => {
      if (data) {
        res.status(200).send(true);
      } else {
        res.status(400).json({
          message: "Incorrect coach Id or Password",
        });
      }
    });
  };

exports.getAllCoaches = async (req,res) => {
    Model.CoachesModel.find().then((data)=> {
        //console.log(data);
        res.status(200).json({
            data : data
        })
    })
   
}

exports.getCoach = async (req,res) => {
    let id = req.params.coachId.slice(3);
    Model.CoachesModel.findOne({coachId: id}).then((data)=> {
        if(data){
            res.status(201).json({
                data
            })
        }else{
            res.status(400).json({
                "message": "Coach Id does not exist"
            })
        }
    })

}   
exports.getUser = async (req,res) => {
    let id = req.params.userId.slice(3);
    Model.UserModel.findOne({userId: id}).then((data)=> {
        if(data){
            res.status(201).json({
                data
            })
        }else{
            res.status(400).json({
                "message": "User Id does not exist"
            })
        }
    })
}

exports.makeAppointment = async (req,res) => {
    let userID = req.params.userId.slice(3);
    let coachID = req.params.coachId.slice(3);

    Model.UserModel.findOne({userId: userID}).then((user)=>{
        if(user){
            Model.CoachesModel.findOne({coachId: coachID}).then((coach)=>{
                if(coach){
                    //Main logic of making appointment 
                    if(Validator.ValidateSlot(req.body.slot)){
                        if(Validator.ValidateDateOfAppointment(req.body.dateOfAppointment)){
                            
                        }else{
                            res.status(400).json({
                                "message": "Date should be any upcoming 7 days"
                            })
                        }
                    }else{
                        res.status(400).json({
                            "message": "Slot should be a valid one"
                        })
                    }

                }else{
                    res.status(400).json({
                        "message": "Coach Id does not exist"
                    })
                }
            })
        }else{
            res.status(400).json({
                "message": "User Id does not exist"
            })
        }
    })
}
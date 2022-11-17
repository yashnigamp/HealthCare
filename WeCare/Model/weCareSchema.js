const mongoose = require("mongoose");

//Connection to database
mongoose
  .connect("mongodb://localhost:27017/WeCare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connection Successful");
  });

// Schema of Database
const weCareUserModelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    password: { type: String },
    gender: { type: String },
    dateOfBirth: Date,
    email: { type: String },
    mobileNumber: { type: String },
    pinCode: Number,
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const weCareCoachesModelSchema = new mongoose.Schema(
  {
    coachId: { type: String },
    name: { type: String },
    password: { type: String },
    gender: { type: String },
    dateOfBirth: Date,
    mobileNumber: Number,
    speciality: { type: String },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const weCareBookingModelSchema = new mongoose.Schema(
  {
    bookingId: { type: String },
    userId: { type: String },
    coachId: { type: String },
    appointmentDate: Date,
    slot: { type: String },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//Model of DataBase
const UserModel = mongoose.model("users", weCareUserModelSchema);
const CoachesModel = mongoose.model("coaches", weCareCoachesModelSchema);
const BookingModel = mongoose.model("bookings",weCareBookingModelSchema);

module.exports = 
( Model = {
    UserModel,
    CoachesModel,
    BookingModel
})
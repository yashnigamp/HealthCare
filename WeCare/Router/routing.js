const express = require('express');

const router = express.Router();
const weCareController = require('../Controller/weCareController')

router.get('/setupDb',weCareController.setupDb);
router.post('/users',weCareController.setupUser);
router.post('/users/login',weCareController.userLogin);
router.post('/coaches',weCareController.setupCoaches);
router.post('/coaches/login',weCareController.coachLogin);
router.get('/coaches/all',weCareController.getAllCoaches);
router.get('/coaches/:coachId',weCareController.getCoach);
router.get('/users/:userId',weCareController.getUser);
router.post('/users/booking/:userId/:coachId',weCareController.makeAppointment);



module.exports = router;
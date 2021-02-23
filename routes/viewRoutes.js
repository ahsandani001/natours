const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Overview Page route
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

// Tour page route
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

// Login Route
router.get('/login', authController.isLoggedIn, viewController.login);
router.get('/signup', authController.isLoggedIn, viewController.signup);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

// Route for traditional submiting a form
/* router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
); */

module.exports = router;

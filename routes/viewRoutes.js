const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.use(viewController.alerts);

// Overview Page route
router.get('/', authController.isLoggedIn, viewController.getOverview);

// Tour page route
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

// Login Route
router.get('/login', authController.isLoggedIn, viewController.login);
router.get('/signup', authController.isLoggedIn, viewController.signup);
router.get('/me', authController.protect, viewController.getAccount);
router.get(
  '/my-tours',
  // bookingController.createBookingCheckout,
  authController.protect,
  viewController.getMyTours
);

router.get(
  '/create-tour',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.createTour
);

router.get(
  '/edit-tour/:tourId',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.editTour
);

router.post(
  '/update-tour/:slug',
  authController.protect,
  authController.restrictTo('admin'),
  tourController.uploadTourImages,
  tourController.resizeTourImages,
  viewController.updateTour
);

router.get(
  '/delete-tour/:tourId',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.deleteTour
);

// Route for traditional submiting a form
/* router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
); */

module.exports = router;

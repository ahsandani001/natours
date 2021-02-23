const express = require('express');
const router = express.Router({ mergeParams: true });

const reviewController = require(`${__dirname}/../controllers/reviewController.js`);
const authController = require(`${__dirname}/../controllers/authController.js`);

// POST tour/123456/reviews         // Post review to a tour
// Get tour/123456/reviews          // Get tour reviews
// Get tour/123456/reviews/123456   // Get tour single specific review
// Whenever this route occurs it will end up on this review router and use other paramters of tours because of mergeParams

router.use(authController.protect);
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );

module.exports = router;

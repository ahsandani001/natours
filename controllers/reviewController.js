const Review = require(`${__dirname}/../models/reviewModel.js`);

// const AppError = require('../utils/AppError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

/* exports.getAllReviews = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on tour
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  
  const reviews = await Review.find(filter);
  
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
}); */

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAllDoc(Review);
exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
/* exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
}); */

/* exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    next(new AppError('No review found with this Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
}); */

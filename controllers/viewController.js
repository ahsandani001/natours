const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for confirmation. If your booking doesn't show up immediately, Please come back later.";

  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build template

  // 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2)  Build the template

  // 3) Render the template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

exports.createTour = (req, res, next) => {
  res.status(200).render('manage-tour', {
    title: 'Create new Tour',
  });
};

exports.editTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) {
    return next(new AppError('No tour found with this id', 404));
  }

  res.status(200).render('manage-tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

exports.updateTour = (req, res, next) => {
  const slug = req.params.slug;
  console.log({ slug, body: req.body });
  res.send('ok');
};

exports.deleteTour = async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) return next(new AppError('No tour find with that Id', 404));

  res.send({ tour });
};

exports.login = (req, res) => {
  res.status(200).render('auth/login', {
    title: 'Login to your account',
  });
};

exports.signup = (req, res) => {
  res.status(200).render('auth/signup', {
    title: 'Create your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('auth/account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with returned ID
  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  if (!tours.length) {
    return next(new AppError('It looks you dont book any tour yet!', 404));
  }

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

// function for traditional submiting a form
/* exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('auth/account', {
    title: 'Your account',
    user: updatedUser,
  });
}); */

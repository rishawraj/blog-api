const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("passport-jwt");
// const { use } = require("passport");

const User = require("../models/user");
const passport = require("passport");

exports.users_get = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
};

exports.signup_post = [
  body("username", "User must be atleast 3 Characters long.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("password", "Password must at least 6 characters long.")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  body("confirmPassword", "Password must be at least 6 characters long.")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .custom(async (value, { req }) => {
      if (value != req.body.password) {
        throw new Error("confirmed Password must be same as password");
      }
      return true;
    }),

  // proces request
  async (req, res, next) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    // check  if username exits
    const UserExists = await User.find({ username: req.body.username });

    if (UserExists.length > 0) {
      return res.status(409).json({
        error: "username already exists.",
      });
    }

    // create new user
    bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) =>
          res.json({ message: "user created successfully", user })
        )
        .catch((err) => res.json(err));
    });
  },
];

exports.get_user = (req, res) => {
  User.findById(req.param.id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

// exports.login_post = (req, res) => {
//   passport.authenticate("local", { session: false }, (err, user) => {
//     if (err || !user) {
//       return res.status(401).json({
//         message: "Incorrect Username or Password",
//         user,
//       });
//     }

//     jwt.sign(
//       { _id: user.id, username: user.username },
//       process.env.SECRETKEY,
//       { expiresIn: "10m" },
//       (err, token) => {
//         if (err) return res.status(400).json(err);

//         res.json({
//           token: token,
//           user: { _id: user._id, username: user.username },
//         });
//       }
//     );
//   })(req, res);
// };

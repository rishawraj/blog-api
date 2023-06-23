const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

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

  body("password", "Password must at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("confirmPassword", "Password must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    })
    .escape(),

  // process request
  async (req, res) => {
    const errors = validationResult(req);

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

exports.login_post = [
  body("username", "user must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("password", "Password must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const user = await User.findOne({ username: req.body.username });

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        const payload = {
          id: user._id,
          username: user.username,
          password: user.password,
        };
        const token = jwt.sign(payload, process.env.JWTSECRET, {
          expiresIn: "1d",
        });
        // console.log(token);
        // console.log(user);

        return res.json({ token: token, user: user });
      } else {
        return res.json({ message: "Incorrect Password or Username" });
      }
    });
  },
];

exports.logout = (req, res) => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("user");

  res.json({ message: "Logout Successful!" });
};

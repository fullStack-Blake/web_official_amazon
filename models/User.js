const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  type: {
    type: String,
    default: "User"
  }
});

userSchema.pre("save", function(next) {
  // Salt random generated strings
  bcrypt
    .genSalt(10)
    .then(salt => {
      bcrypt
        .hash(this.password, salt)
        .then(encryptPassword => {
          // Store hash password in DB
          this.password = encryptPassword;
          next();
        })
        .catch(err => console.log(`Error when hashing: ${err}`));
    })
    .catch(err => console.log(`Error when salting: ${err}`));
});

const userModel = mongoose.model("User", userSchema);

// firstName
// lastName
// email
// password

module.exports = userModel;

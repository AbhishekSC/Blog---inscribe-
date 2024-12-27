//import
import mongoose from "mongoose";
import { randomBytes, createHmac } from "crypto";

//Schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      //salt: random string
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/default-avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

//middlewares
userSchema.pre("save", function (next) {
  const user = this; //current user

  if (!user.isModified("password")) return;

  //hashing the password
  //Salt [random string] : Secret key[unique 16 digits ] for every user or admin
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  //updateing user obj
  this.salt = salt;
  this.password = hashedPassword;

  next();
});

//Virtual functions
//matching the password coming from user with DB password
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found!");

  //salt and password from DB
  const salt = user.salt;
  const hashedPassword = user.password;

  //hashedPassword from user
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userProvidedHash !== hashedPassword) {
    throw new Error("Incorrect password");
  }

  return user;
});

//model
const User = mongoose.model("user", userSchema);

//export
export default User;

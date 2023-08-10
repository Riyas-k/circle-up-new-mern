import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      // required:true
    },
    lastName: {
      type: String,
      // required:true
    },
    UserName: {
      type: String,
      required: true,
      // unique:true
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // required:true
    },
    dp: {
      type: String,
    },
    bio: {
      type: String,
    },
    // gender: {
    //   type: String,
    // },
    location: {
      type: String,
    },
    // facebook: {
    //   type: String,
    // },
    // instagram:{
    //     type:String
    // },
    isBlock: {
      type: Boolean,
      default: false,
    },
    followers: [],
    following: [],
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
export default User;

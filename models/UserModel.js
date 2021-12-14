const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const addressSchema = Schema({
  addressLineOne: { type: String, required: true },
  addressLineTwo: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: Number, required: true },
  isBilling: { type: Boolean, default: false },
  isShipping: { type: Boolean, default: false },
});

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  enabled: { type: Boolean, defalut: false },
  password: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: Number, retuired: true },
  addresses: { type: [addressSchema], default: () => [] },
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };

/*

export class User {
    constructor(
      public id: string = '',
      public firstName: string = '',
      public lastName: string = '',
      public role: string = '',
      public enabled: boolean = false,
      public password: string = '',
      public email: string = '',
      public contactNumber: string = '',
      public addresses: Array<Address> = new Array<Address>()
    ) {}
  }
  
  export class Address {
    constructor(
      public id: string = '',
      public addressLineOne: string = '',
      public addressLineTwo: string = '',
      public city: string = '',
      public state: string = '',
      public country: string = '',
      public postalCode: string = '',
      public isBilling: boolean = false,
      public isShipping: boolean = false
    ) {}
  }*/

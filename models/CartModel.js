const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const cartItemProductSchema = Schema({
  productCode: { type: String, required: true },
  productImageUrl: { type: String, default: "" },
  productName: { type: String, required: true },
  productBrand: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQtyAvailable: { type: Number, required: true },
});

const cartItemSchema = Schema({
  itemTotal: { type: Number, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  productCount: { type: Number, required: true },
  buyingPrice: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  cartItemProduct: { type: cartItemProductSchema, required: true },
});

const cartSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  grandTotal: { type: Number, required: true },
  cartItems: { type: [cartItemSchema], required: true },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = { cartModel };

/*  

export class CartItem {
    constructor(
      public itemId: string = '',
      public itemTotal: number = 0,
      public productId: string = '',
      public productCount: number = 0,
      public buyingPrice: number = 0,
      public isAvailable: boolean = false,
      public cartItemProduct: CartItemProduct = new CartItemProduct()
    ) {}
  }

export class CartItemProduct {
    constructor(
      public productCode: string = '',
      public productImageUrl: string = '',
      public productName: string = '',
      public productBrand: string = '',
      public productDescription: string = '',
      public productPrice: number = 0,
      public productQtyAvailable = 0
    ) {}
  }

/*
export class Cart {
    constructor(
      public id: string = '',
      public userId: string = '',
      public grandTotal: number = 0,
      public cartItems: Array<CartItem> = new Array<CartItem>()
    ) {}
  }
  
  export class CartItem {
    constructor(
      public itemId: string = '',
      public itemTotal: number = 0,
      public productId: string = '',
      public productCount: number = 0,
      public buyingPrice: number = 0,
      public isAvailable: boolean = false,
      public cartItemProduct: CartItemProduct = new CartItemProduct()
    ) {}
  }
  
  export class CartItemProduct {
    constructor(
      public productCode: string = '',
      public productImageUrl: string = '',
      public productName: string = '',
      public productBrand: string = '',
      public productDescription: string = '',
      public productPrice: number = 0,
      public productQtyAvailable = 0
    ) {}
  }
  */

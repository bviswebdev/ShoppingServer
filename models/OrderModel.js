const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const orderItemSchema = Schema({
  total: { type: Number, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  productCount: { type: Number, required: true },
  buyingPrice: { type: Number, required: true },
  productName: { type: String, required: true },
});

const orderSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  orderTotal: { type: Number, required: true },
  orderCount: { type: Number, required: true },
  shippingId: { type: Schema.Types.ObjectId, required: true },
  billingId: { type: Schema.Types.ObjectId, required: true },
  orderItems: { type: [orderItemSchema], required: true },
  orderDate: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };

/*
export class Order {
  constructor(
    public id: string = '',
    public userId: string = '',
    public orderTotal: number = 0,
    public orderCount: number = 0,
    public shippingId: string = '',
    public billingId: string = '',
    public orderItems: Array<OrderItem> = new Array<OrderItem>(),
    public orderDate: string = ''
  ) {}
}


export class OrderItem {
  constructor(
    public itemId: string = '',
    public total: number = 0,
    public productId: string = '',
    public productCount: number = 0,
    public buyingPrice: number = 0,
    public productName: string = ''
  ) {}
}


/*

export class Order {
  constructor(
    public id: string = '',
    public userId: string = '',
    public orderTotal: number = 0,
    public orderCount: number = 0,
    public shippingId: string = '',
    public billingId: string = '',
    public orderItems: Array<OrderItem> = new Array<OrderItem>(),
    public orderDate: string = ''
  ) {}
}

export class OrderItem {
  constructor(
    public itemId: string = '',
    public total: number = 0,
    public productId: string = '',
    public productCount: number = 0,
    public buyingPrice: number = 0,
    public productName: string = ''
  ) {}
}




*/

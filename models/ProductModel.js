const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const categorySchema = Schema({
  catName: { type: String, required: true },
  catDesc: { type: String, required: true },
  catImgUrl: { type: String, default: "" },
  catActive: { type: Boolean, default: true },
});

const fileSchema = Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileUrl: { type: String, required: true },
  fileSource: { type: Buffer, required: true },
});

const productSchema = Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productImage: { type: fileSchema, required: true },
  isActive: { type: Boolean, required: true },
  category: { type: categorySchema, required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: "User" },
  purchases: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  imageUrl: { type: String, default: "" },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = { productModel };

/*
export class Product {
    constructor(
      public _id: string = '',
      public code: string = '',
      public name: string = '',
      public brand: string = '',
      public description: string = '',
      public unitPrice: number = 0.0,
      public quantity: number = 0,
      public fileName: string = '',
      public fileType: string = '',
      public fileSize: number = 0,
      public fileSource: any = '',
      public isActive: boolean = false,
      public category: Category = new Category(),
      public supplierId: string = '',
      public purchases: number = 0,
      public views: number = 0,
      public imageUrl: string = ''
    ) {}
  }
  
  export class Category {
    constructor(
      public id: string = '',
      public catName: string = '',
      public catDesc: string = '',
      public catImgUrl: string = '',
      public catActive: boolean = false
    ) {}
  }*/

import mongoose from 'mongoose'
const { Schema, model } = mongoose
const base = { timestamps:true }
export const User = model('User',new Schema({ loginName:{type:String,required:true,unique:true,lowercase:true,trim:true},displayName:{type:String,required:true},passwordHash:{type:String,required:true},role:{type:String,enum:['superadmin','admin'],required:true},active:{type:Boolean,default:true},mustChangePassword:{type:Boolean,default:false},lastLogin:Date },base))
export const Product = model('Product',new Schema({code:{type:String,required:true,unique:true},name:{type:String,required:true,trim:true},branch:{type:String,enum:['Kuzof','Motor xodovoy'],required:true},brand:{type:String,default:''},partNumber:{type:String,default:''},notes:{type:String,default:''},createdBy:{type:Schema.Types.ObjectId,ref:'User'}},base))
const inventorySchema=new Schema({product:{type:Schema.Types.ObjectId,ref:'Product',required:true},filial:{type:Number,enum:[1,2,3],required:true},quantity:{type:Number,default:0,min:0},minQuantity:{type:Number,default:3,min:0} },base)
inventorySchema.index({product:1,filial:1},{unique:true})
export const Inventory=model('Inventory',inventorySchema)
export const Movement=model('Movement',new Schema({product:{type:Schema.Types.ObjectId,ref:'Product',required:true},filial:{type:Number,required:true},destinationFilial:Number,type:{type:String,enum:['receive','sale','return','transfer','adjust'],required:true},quantity:{type:Number,required:true},before:Number,after:Number,note:String,by:{type:Schema.Types.ObjectId,ref:'User',required:true},transferId:String},base))
export const Audit=model('Audit',new Schema({by:{type:Schema.Types.ObjectId,ref:'User'},action:String,target:String,details:String},base))

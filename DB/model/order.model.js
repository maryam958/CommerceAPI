import { Schema, model,Types} from "mongoose";


const orderSchema = new Schema({

    userId:{
    type:Types.ObjectId,
    ref:"User",

    },
products:{
    type:[{
        productId:{
            type:Types.ObjectId,
            ref:"Product",
            required: [true, 'productId is required'],
        },
        unitPrice:String,
        quantity:{
            type:Number,
            default:1
        },
        totalPrice:{
            type:Number,
            default:1

        }
    }],
},

    address:{
        type:String,
        required:[true,'Address is Required']
    },
    phone:{
        type:String,
        required:[true,'phone is Required']
    },
    
    
    paymentMethod:{
        type:String,
        default:"Cash",
        enum:["Cash","Visa"]
    },
    couponId:{
        type:Types.ObjectId,
        ref:"Coupon"
    },
    sumTotal:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        default:"Placed",
        enum:["Placed","Received","Rejected","OnWay"]
    }


}, {
    timestamps: true
})


const orderModel = model('Order', orderSchema)
export default orderModel


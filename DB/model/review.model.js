import { Schema, model,Types} from "mongoose";


const reviewSchema = new Schema({

    message: {
        type: String,
        required: [true, 'Message is required'],
      
    },

    userId:{
    type:Types.ObjectId,
    ref:"User",
    required: [true, 'userId is required'],

    },

productId:{
    type:Types.ObjectId,
    ref:"Product",
},
rating:{
    type:Number,
    default:1,
    min:[1,"min 1"],
    max:[5,"max 5"]
}

}, {
    timestamps: true
})


const reviewModel = model('Review', reviewSchema)
export default reviewModel


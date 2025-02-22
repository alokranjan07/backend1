import mongoose from 'mongoose'
import mongooseAgregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema=mongoose.Schema({
    videFile:{
        type:String,
        required:true,

    },
    thumbnail:{
        type:String,
        required:true,
        
    },
     title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
        
    },
     duration:{
        type:number,
        required:true,
        
    },
     views:{
        type:number,
        default:0,
        
    },
    isPublisehed:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
//videoSchema.plugin(mongooseAgregatePaginate)
 videoSchema.plugin(mongooseAgregatePaginate)


export const Video=mongoose.model("Video",videoSchema)
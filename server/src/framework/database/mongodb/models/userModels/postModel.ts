import mongoose,{Schema,model} from "mongoose";

const postSchema = new Schema(
    {
        userId:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        userName:{
            type:String
        },
        likes:[],
        comments:[],
        report: [
            {
              userId: {
                type: String,
                required: true,
              },
              reason: {
                type: String, // or the appropriate data type for your reason field
                required: true,
              },
            },
          ],
        image:[],
        adminDeleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)

const Post = model('Post',postSchema);

export default Post
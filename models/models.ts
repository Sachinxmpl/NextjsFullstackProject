import mongoose , {Schema , model , Document} from "mongoose";

 export interface Message extends Document {
    content : string  
    createdAt : Date 
}

const messageSchema : Schema<Message> = new Schema ({
    content : {
        type : String , 
        required : true
    } , 
    createdAt : {
        type : Date , 
        required : true , 
        default : Date.now()
    }
})


export interface User extends Document  {
    username : String , 
    email : String , 
    password : String , 
    verifyCode : String , 
    verifyCodeExpiry : Date , 
    isAcceptingMessage : boolean , 
    isVerified : boolean , 
    messages : Message[]
}

const userSchema : Schema<User> = new Schema({
    username : {
        type : String , 
        required : [true , "Username is required"] , 
        trim : true  , 
        unique : true
    } , 
    email : {
        type : String , 
        required : [true  , "Email is required"] , 
        unique : true  , 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"]
    } , 
    password : {
        type : String , 
        required : [true , "Password is required"] 
    } , 
    verifyCode : {
        type : String , 
        required : true 
    } , 
    verifyCodeExpiry : {
        type : Date , 
        required : [true , "Verify Code Expiry is required"]
    } , 
    isVerified : {
        type : Boolean , 
        default : false
    } , 
    isAcceptingMessage : {
        type : Boolean , 
        default : true 
    } , 
    messages : [messageSchema]  
})

const UserModel =  (mongoose.models.User as mongoose.Model<User> )||  model<User>("User" , userSchema)
 
export default UserModel ; 
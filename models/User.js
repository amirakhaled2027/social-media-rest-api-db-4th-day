const mongoose = require('mongoose')

//let's build our user schema, inside the schema, we're gonna create our properties
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max: 50,
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array, //coz we're gonna keep user's ids inside these arrays
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1, 2, 3]
    }
},
//Here we're gonna create timestamps
//Meaning: whenever you create users or update this, it's gonna automatically update our timestamps
{timestamps:true}
)

//to use this user schema, you have to export it to be able to use it in users.js and auth.js
module.exports = mongoose.model("Users", UserSchema)
//"Users" is the name given to the model that is being exported using modelNames.exports.



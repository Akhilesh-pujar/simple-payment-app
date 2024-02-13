const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();
const uri = process.env.MONGODB_URL;
mongoose.connect(uri)

const User = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        
    },
    firstname:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:10,

    },
    lastname:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:10,
    },
    password:{
        type:String,
        require:true,
        minLength:6,

    }
})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const PayAccount = mongoose.model('PayAccount', accountSchema);

const Paytmuser = mongoose.model('Paytmuser', User);

module.exports={Paytmuser, PayAccount};
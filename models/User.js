const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username:
    {
        type:String,
        Unique:true,
        Required:true,
        Trim:true
    },
    
    email:
    {
        type:String,
        Unique:true,
        Required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']    
    },

    thoughts:
    [
        {
            type:Schema.Types.ObjectId,
            ref:'Thought'   
        }
    ],

    friends:
    [
        {
            type:Schema.Types.ObjectId,
            ref:'User'   
        }
    ],
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false,
  }
);

const User = model('User', userSchema);

module.exports = User;
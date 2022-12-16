const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText:
    {
        type:String,
        Required:true,
        maxlength:280
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

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
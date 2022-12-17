const { Schema, model, Types } = require('mongoose');
const moment = require('moment/moment')

const thoughtSchema = new Schema(
  {
    thoughtText:
    {
        type:String,
        Required:true,
        maxlength:280,
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
        get: formatDate,
    },
    username:
    {
        type:String,            
        required:true,
    },
  },
  {
    toJSON: {
        virtuals: true,
        getters:true,
    },
    id: false,
  }
);

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:
    {
        type:String,
        Required:true,
        maxlength:280,
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
        get: formatDate,
    },
    username:
    {
        type:String,            
        required:true,
    },
})

function formatDate (date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss')
}
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
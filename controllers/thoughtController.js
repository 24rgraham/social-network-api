const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findByIdAndUpdate(req.body.userId,
                    {
                        $addToSet: { thoughts: thought._id }
                    },
                    { new: true }).then((user) =>
                        !user
                            ? res.status(404).json({ message: 'No user found' })
                            : res.json(thought))
                    .catch((err) => res.status(500).json(err));
            })
    },

    updateThought(req,res){
        Thought.findByIdAndUpdate(
            {id: req.params.thoughtId},
            {$set: req.body},
        ).then((thought) =>
        !thought
            ? res.status(404).json({message:'thoughtnot found'})
            : res.json(thought)
        )
    },

    // Delete a thought and associated apps
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that ID' })
                }
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { thoughts: req.params.Id } },
                    { new: true }
                )
            }).then(data => {res.json(data)})
            .catch((err) => res.status(500).json(err));
    },
};
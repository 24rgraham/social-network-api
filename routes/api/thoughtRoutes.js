const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:userId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

module.exports = router;
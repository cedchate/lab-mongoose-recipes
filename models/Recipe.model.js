const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: String,
  level: {
    type: String,
    enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'],
  },
  ingredients: [ String ],
  cuisine: String,
  dishType: String,
  image: {
    type: String,
    // default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    // default: '2023-02-10',
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

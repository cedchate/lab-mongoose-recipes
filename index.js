const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()

  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    try{ 
      const Pasta= await Recipe.create({
        title: 'Pasta',
        level: 'Easy Peasy',
        ingredients: ['Pasta'],
        cuisine: "Italian",
        dishType: 'main_course',
        duration: 10,
      });
      console.log(Pasta.title+' added.');
      const allRecipes= await Recipe.create(data);
      allRecipes.forEach(recipe =>console.log(recipe.title+' added.'));
      await Recipe.findOneAndUpdate(
        {title: 'Rigatoni alla Genovese'},
        {duration: 100},
        { upsert: true }
      ).then(console.log('Duration as been changed'))
      .catch((e) => console.log(e))
      await Recipe.findOneAndDelete({title:'Carrot Cake'})
      .then(console.log('Carrot Cake is no longer available'))
      .catch((e) => console.log(e))
    }catch(error){
      console.log(error);
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=> {
    console.log('Disconnecting from the database...')
    mongoose.connection.close()
  })


const mongoose = require('mongoose');


const Person = mongoose.model('Person', { // Lá no banco, ele vai criar uma coluna 
                                         // chamada "people" 
                                        // (ele utiliza sempre o plural)
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person;
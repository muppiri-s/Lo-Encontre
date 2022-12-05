// const User = require('../models/userModel')
const url = require('url');
const {PythonShell} =require('python-shell');

// login user
const getCategories = async (req, res) => {
    const key = req.query.key

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: '../scrapers/categories.py', //If you are having python_test.py script in same folder, then it's optional.
        args: [key] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('./src/Server/scrapers/categories.py', options, function (err, result){
        if (err) throw err;

        console.log('result: ', result.toString());
        res.json({msg:  result.toString()})
  });
} 

module.exports = {getCategories}
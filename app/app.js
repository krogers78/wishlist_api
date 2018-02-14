const bodyParser = require('body-parser');
const glob = require('glob');
const db = require('./db');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    var models = glob.sync(__dirname + '/models/*.js');
    console.log(models);
    models.forEach(function (modelFileName) {
        require(modelFileName);
    });

    var controllers = glob.sync(__dirname + '/controllers/*.js');
    console.log(controllers);
    controllers.forEach(function (contollerFileName) {
        const controller = require(contollerFileName);
        controller(app);
    });

}
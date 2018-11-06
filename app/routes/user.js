const { userAPI } = require('../api'),
    path = require('path'),
    { wrapAsync } = require('../infra');

module.exports = app => {

    app.route('/user/login')
        .post(wrapAsync(userAPI.login));

    app.route('/user/signup')
        .post(wrapAsync(userAPI.register)); 
        
    app.route('/user/exists/:userName')
        .get(wrapAsync(userAPI.checkUserNameTaken));

    app.route('/products')
    .get(wrapAsync(userAPI.produtos));

    app.route('/products/variants')
    .get(wrapAsync(userAPI.variants));

    
};
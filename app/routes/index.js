'use strict';

module.exports = function (app) {
  app.use('/celebrities', require('./celebrities'));
  app.use('/', require('./user'));

  app.use('/tos', function(req, res) {
    res.render('tos');
  });
    // HTTP 500
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('500', { error: err });
  });

  // HTTP 404
  app.use(function(req, res){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
    res.type('txt').send('Not found');
  });

};
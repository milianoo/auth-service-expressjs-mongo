var User = require('./user.model');

/* GET users listing. */
exports.getUsers = function (req, res) {

    User.find({}, function(err, users) {

        res.send(users);
    });
};

exports.getUser = function (req, res) {

    User.find({}, function(err, users) {

        res.send(users);
    });
};

exports.postUser = function(req, res) {

  var user = new User();

  // read req.body.[ your property ]

  user.name = req.body.name;
  user.type = req.body.type;
  user.password = req.body.password;

  user.save(function (err) {
    if (err){
        res.status(400).send({ reason: 'BadRequest', message: 'field "name", "type" and "password" are required.' });
        return;
    }
    res.status(201).send({ message: 'New User Created.', data: user });
  });
};

exports.putUser = function (req, res, next) {

  User.findById( req.params.id, function (err, user) {
      if (err){
          next(err);
      }

      // Perform update here

      res.json(user);
  });

};

exports.deleteUser = function (req, res, next) {

    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'User removed!' });
    });

};
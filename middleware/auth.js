module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }

  //this code exports an object that has a function (method) called 'ensureAuth'

  //this code is asking, when the person made the request, information regarding the user is also sent over to verify if this person is already logged in (aka 'isAuthenticated')

  //next() is a function that is part of the Express middleware mechanism. It is used to pass control to the next middleware function in the stack. Middleware functions are functions that have access to the rquest object ('req'), the response object ('res'), and the next middleware function in the application's request-response cycle. 
  
var express = require('express');
var router = express.Router();

// In-memory array to store messages
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  // Pass the messages array to the 'index' template
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

/* GET new message form. */
router.get('/new', function(req, res, next) {
  // Render the 'form' template when '/new' is accessed
  res.render('form', { title: 'Post a new message' });
});

/* POST new message. */
router.post('/new', function(req, res, next) {
  // Retrieve new message details from form submission
  const messageText = req.body.text; // Updated to match 'name' attribute in form.ejs
  const messageUser = req.body.user; // Updated to match 'name' attribute in form.ejs

  // Add the new message to the array
  messages.push({ text: messageText, user: messageUser, added: new Date() });

  // Redirect the user back to the home page
  res.redirect('/');
});

module.exports = router;

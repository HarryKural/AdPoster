var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
  res.render('index',
      {
        title: 'AdPoster'
      });
});

/* GET About page. */
router.get('/about', function (req, res, next)
{
    res.render('about',
        {
            title: 'About'
        });
});

/* GET Contact page. */
router.get('/contact', function (req, res, next)
{
    res.render('contact',
        {
            title: 'Contact'
        });
});

/*GET Register page */
router.get('/register', function (req, res, next)
{
    res.render('register',
        {
            title: 'Register'
        });
});

module.exports = router;

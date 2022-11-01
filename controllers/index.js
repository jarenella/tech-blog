const router = require('express').Router();

// main page
router.get('/', async (req, res) => {
  res.render('index.handlebars'); //rendering index.handlebars
});

// router.get('/dish/:num', async (req, res) => {
//   res.render('dish.handlebars', dishes[req.params.num - 1]);
// })

module.exports = router;

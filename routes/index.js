var express = require('express');
var router = express.Router();
const book_services = require('../services/books.services');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const books = await book_services.findBooks();

  res.render('index', {
    respuesta: books,
    title: "Mis Libros"
  });

});

router.get('/add_book', (req, res, next) => {
  res.render('register', { title: "Iniciar Sesión" });
})

router.post('/add_book', async (req, res, next) => {
  let book = req.body;

  const response = await fetch('http://localhost:4040/api/book', {
     method: 'post',
     body: JSON.stringify(book),
     headers: {'Content-Type': 'application/json'}
  });

  res.render('index');

});

module.exports = router;

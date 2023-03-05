var express = require('express');
var router = express.Router();
const book_services = require('../services/books.services');
const fileUpload = require('express-fileupload')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let books = await book_services.findBooks();

  res.render('index', {
    respuesta: books,
    title: "Mis Libros"
  });

});

router.get('/book/:bookId', async function (req, res, next) {
  let idBook = req.params.bookId;

  let book = await book_services.findBookById(idBook);

  res.render('detail', {
    respuesta: book.book
  });

});

router.get('/add_book', (req, res, next) => {
  res.render('register');
});

router.post('/add_book', async (req, res, next) => {
  let book = req.body;

  if (book.name == '' || book.author == '' || book.stock == '' || book.state == 'Selecciona un estado') {
    res.render('register', { error: true });
    return;
  }

  book_services.saveBook(book);

  //Get all books
  let books = await book_services.findBooks();

  res.render('index', {
    respuesta: books,
    title: "Mis Libros"
  });

});

router.get('/upload_img/:bookId', async (req, res, next) => {
  let idBook = req.params.bookId;

  let book = await book_services.findBookById(idBook);

  res.render('upload', { libro: book.book });
});

module.exports = router;

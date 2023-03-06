var express = require('express');
var router = express.Router();
const book_services = require('../services/books.services');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let books = await book_services.findBooks();

  res.render('index', {
    respuesta: books,
    title: "Entrelíneas"
  });

});

router.get('/book/:bookId', async function (req, res, next) {
  let idBook = req.params.bookId;

  let book = await book_services.findBookById(idBook);

  res.render('detail', {
    respuesta: book.book,
    title: "Detalles"
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
    title: "Entrelíneas"
  });

});

router.get('/upload_img/:bookId', async (req, res, next) => {
  title: "Portadas"
  let idBook = req.params.bookId;

  let book = await book_services.findBookById(idBook);

  res.render('upload', { libro: book.book });

});

router.post('/upload_img/:bookId', async (req, res, next) => {
  let idBook = req.params.bookId;
  let notNull = req.files;

  if (notNull == null) {
    let idBook = req.params.bookId;
    let book = await book_services.findBookById(idBook);

    res.render('upload', { libro: book.book, error: true });
    return;
  }

  let { image } = req.files;

  //Create the route for save the img in own side, for seek easy
  let ruta = __dirname + "/../public/images/" + image.name;
  image.mv(ruta);

  //Service for upload the img
  await book_services.uploadImg(idBook, { image: image, dir: ruta });

  let books = await book_services.findBooks();

  res.render('index', {
    respuesta: books,
    title: "Entrelíneas"
  });
});

module.exports = router;

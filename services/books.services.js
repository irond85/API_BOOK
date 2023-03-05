const { json } = require('express');
const fetch = require('node-fetch');

/**
 * REalizar consumo de api
 */
exports.findBooks = async () => {

  const response = await fetch("http://localhost:4040/api/book",
    { method: 'get' })
  const json = response.json();

  return json
}

exports.findBookById = async (id) => {
  const response = await fetch(`http://localhost:4040/api/book/${id}`,
    { method: 'get' })
  const json = response.json();

  return json
}

exports.saveBook = async (book) => {
  const response = await fetch('http://localhost:4040/api/book', {
    method: 'post',
    body: JSON.stringify(book),
    headers: { 'Content-Type': 'application/json' }
  });
}


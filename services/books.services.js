const { json } = require('express');
const fetch = require('node-fetch');
const FormData = require("form-data");
const fs = require("fs");

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

exports.uploadImg = async (id, req) => {
  const form = new FormData();
  form.append("image", fs.createReadStream(req.dir));

  const res = await fetch(`http://localhost:4040/api/book/upload/${id}`, {
    method: 'post',
    body: form,
  })
    .catch(function (error) {
      console.log(error);
    });
}


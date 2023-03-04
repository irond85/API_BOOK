const { json } = require('express');
const fetch = require('node-fetch');

/**
 * REalizar consumo de api
 */
exports.findBooks = async () => {
    
    const response = await fetch("http://localhost:4040/api/book",
    { method: 'get'})
    const json = response.json();
    
    return json
}

// exports.findCharacterById = async (id) => {
//     const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`,
//     { method: 'get'})
//     const json = response.json();
    
//     return json
// }

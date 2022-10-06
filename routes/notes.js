const note = require('express').Router();
// const  {readFromFile, writeToFile, readAndAppend} = require('../helper/fsUtils.js');
const fs = require('fs');
let dbJson  = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
// const removeNote = require('../helper/noteRemover');

note.get('/', (req, res) => {
    res.json(dbJson)
    // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // console.log(`${req.method}`);
    // res.json(`${req.method} request received`);
})

note.post('/', (req, res) => {
    console.log(`${req.method}`)
    const { title, text } = req.body;
    if(title && text){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
    const response = {
        status: 'success',
        body: newNote,
      };

      dbJson.push(newNote);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify((dbJson), null, 4), "utf8", () => {
    res.json(dbJson);
})

    // readAndAppend(newNote, './db/db.json')
    }else{
        res.status(500).json('ERROR in Posting new note!')
    }
});

note.delete('/:id', (req,res) => {

    const selectedNote = req.params.id;
    console.log(selectedNote);

    const index = dbJson.findIndex((note) => note.id === selectedNote);

    dbJson.splice(index, 1);

    fs.writeFile(__dirname + '/db/db.json', JSON.stringify((dbJson), null, 4), 'utf8', () => {
        res.json(dbJson);
    })

    
    
});

module.exports = note;
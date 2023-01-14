// all endpoints 
/* 
    get - gets information
    post - creates new information
    put - update existing resources
    delete - remove a record

    Create - create
    Read - get
    Update - put
    Delete - delete

    Quote Endpoint
        get -> get a quote
        post -> create a new quote
        put -> update a quote
        delete -> delete a quote
        
    QuoteList Endpoint
        get -> get a quotelist
        post -> create a new quotelist
        put -> update a quotelist
            this would involve adding, delting, and modifying quotelist
        delete -> deleting a quotelist
*/

import express from 'express'
import QuoteManager from './QuoteManager.js'
const app = express();

const portNumber = 3000;

export default function runAPI() {
    console.log("Running 'runAPI' method")
    const qm = new QuoteManager();
    qm.readListFromFile();
    
    app.route('/quote', )
        .get((req, res) => {
            console.log(req.query)
            res.send()
        })
        .post((req, res) => {
            res.send()
        })
        .put((req, res) => {
            res.send()
        })
        .delete((req, res) => {
            res.send()
        })
        
    app.route('/random')
        .get((req, res) => {
            res.send(qm.getRandomQuote())
        })

    app.listen(portNumber, () => {
        console.log('QuoteAPI running on port ' + portNumber)
    })
        
}
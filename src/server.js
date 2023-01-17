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

    // send request to quote endpoint and specify either
    // hash, or substring for type, and appropriate query
    app.get('/quote/:type/:query', (req, res) => {
        if (req.params.type == 'hash') {
            res.send(qm.getQuoteByHash(req.params.query));
        } else {
            res.send(qm.getQuoteBySubstring(req.params.query));
        }
    })

    // get random quote
    app.get('/random', (req, res) => {
        res.send(qm.getRandomQuote())
    })

    // create new quote
    app.post('/quote/:quoteJSON', (req, res) => {
        qm.addQuoteFromJSON(req.params.quoteJSON)
        res.send("Successfully created object!")
    })

    // app.put()

    // app.delete()

    app.listen(portNumber, () => {
        console.log('QuoteAPI running on port ' + portNumber)
    })
        
}

/* 
List of Endpoints
    Get Quote
    Add Quote
    Edit Quote
    Delete Quote

    Get random quote

*/
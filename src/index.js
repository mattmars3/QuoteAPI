import QuoteManager from './QuoteManager.js'
import runAPI from './server.js';
function run() {
    // initialize the quote manager
    // runAPI();
    const qm = new QuoteManager();
    qm.readFromExternalFile("./misc/quotes.txt") 
    qm.printAllQuotes();
}


run();
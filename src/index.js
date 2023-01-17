import QuoteManager from './QuoteManager.js'
import runAPI from './server.js';
function run() {
    // initialize the quote manager
    const qm = new QuoteManager();
    qm.readFromExternalFile("./misc/quotes.txt") 
    qm.writeQuotes();

    runAPI();
}


run();
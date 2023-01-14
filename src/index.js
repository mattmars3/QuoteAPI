import Quote from './Quote.js'
import QuoteManager from './QuoteManager.js'
import QuoteList from './QuoteList.js'

function run() {
    // initialize the quote manager
    const qm = new QuoteManager();

    qm.readFromExternalFile("./misc/quotes.txt")
    qm.printAllQuotes();

    qm.writeQuotes();

}


run();
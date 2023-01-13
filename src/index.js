import Quote from './Quote.js'
import QuoteManager from './QuoteManager.js'
import QuoteList from './QuoteList.js'

function run() {
    // initialize the quote manager
    const qm = new QuoteManager();

    qm.readListFromFile();

    let hash1 = qm.getQuoteHashBySubstring("I found");
    let hash2 = qm.getQuoteHashBySubstring("I don't");

    qm.readFromExternalFile("./misc/quotes.txt")
    qm.printAllQuotes();

    qm.writeQuotes();

}


run();
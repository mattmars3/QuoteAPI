import Quote from './Quote.js'
import QuoteManager from './QuoteManager.js'
import QuoteList from './QuoteList.js'

function run() {
    // initialize the quote manager
    const qm = new QuoteManager();

    qm.readListFromFile();

    let hash1 = qm.getQuoteHashBySubstring("I found");
    let hash2 = qm.getQuoteHashBySubstring("I don't");
    const hashes = [hash1, hash2]
    qm.createQuoteList("Music", hashes) 
    qm.writeQuoteLists();

}


run();
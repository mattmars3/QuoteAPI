import Quote from './Quote.js'
import QuoteManager from './QuoteManager.js'

function run() {
    let testQuote = new Quote("Started out in the spring of 2003, Never went to school, nobody talked to me, except to tell me all the things I couldn't do", "Tough Times", "Jeremy McKinnon", "Right Back at It Again");

    // initialize the quote manager
    const qm = new QuoteManager();

    qm.readListFromFile();

    qm.printAllQuotes()

}


run();
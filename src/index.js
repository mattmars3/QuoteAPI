import Quote from './Quote.js'
import QuoteManager from './QuoteManager.js'

function run() {
    let testQuote = new Quote("I don't wanna die without any scars", "Motivational", "Brad Pitt", "Fight Club");
    // console.log(testQuote.quoteBody)
    const qm = new QuoteManager();

    
    qm.appendQuote(testQuote);
    qm.writeList();

}


run();
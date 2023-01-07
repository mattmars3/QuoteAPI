import Quote from './Quote.js'
import QuoteManager from './QuoteManager.js'

function run() {
    let testQuote = new Quote("I don't wanna die without any scars", "Motivational", "Brad Pitt", "Fight Club");
    let testQuote2 = new Quote("Balls", "Motivational", "Brad Pitt", "Fight Club");
    // console.log(testQuote.quoteBody)
    const qm = new QuoteManager();

    qm.readList(); 
    qm.printAllQuotes();
    // qm.appendQuote(testQuote)
    // qm.writeList();
    
    
    /*
    qm.appendQuote(testQuote);
    qm.appendQuote(testQuote2);
    qm.writeList();
    */

    /*
    qm.readList();
    qm.printAllQuotes();
    */

    /* 
        
        Goals:
            Fix Read and write systems so you can quickly add a quote
            Add a print system to see all the quotes
            decide whether the read method should return value or mutate
    */
    

}


run();
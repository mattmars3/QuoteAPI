import * as crypto from 'crypto';
import * as fs from 'fs';
import Quote from './Quote.js'

export default class QuoteManager {
    constructor(quoteFilePath="./QUOTEMASTERLIST.json") {
        this.quoteFilePath = quoteFilePath;
        
        // read the file and put quotes into the quotemap immediately
        // Object that stores key value pairs
        // the key is the hashed body of the quote and value is the quote object
        this.fullQuoteMap = {};
    }

    // writes the list to the master file
    writeQuotes() {
        // IMPROVE THIS BY USING THE PATH MODULE
        fs.writeFileSync(this.quoteFilePath, JSON.stringify(this.fullQuoteMap))
    }


    // adds a quote object to the QuoteManager full object
    addQuote(quoteObject) {
        // hash the quote body        
        let hashQuoteBody = quoteObject.quoteBody;
        let hashedQuote = crypto.createHash('md5').update(hashQuoteBody).digest('hex').toString();

        // make sure that this quote does not already exist in the object
        // THIS MIGHT NOT BE NECESSARY
        if (!Object.keys(this.fullQuoteMap).includes(hashedQuote)) {
            // add the key and value to the object
            this.fullQuoteMap[hashedQuote] = quoteObject;
        }
    }

    // reads from master file and updates Quote Manager's QuoteMap
    readListFromFile() {
            this.fullQuoteMap = {}
            // read file data into a variable
            const quoteJSONText = fs.readFileSync(this.quoteFilePath);
            // parse the json data
            const jsonData = JSON.parse(quoteJSONText);

            // iterate through the object
            for (let key in jsonData) {
                this.fullQuoteMap[key] = Quote.quoteFromJSON(jsonData[key]);
            }
    }
    
    printAllQuotes() {
        for (let key in this.fullQuoteMap) {
            let quoteData = this.fullQuoteMap[key]
            console.log(Quote.quoteFromJSON(quoteData).toString());
        }
    }

    getQuotesArray() {
        let arrayOfQuotes = [];
        for (let key in this.fullQuoteMap) {
            let quoteData = this.fullQuoteMap[key];
            arrayOfQuotes += Quote.quoteFromJSON(quoteData);
        }
        return arrayOfQuotes;
    }

    // removes the first quote containing the substring
    removeQuote(substr) {
        for (let key in this.fullQuoteMap) {
            if (this.fullQuoteMap[key].quoteBody.includes(substr)) {
                delete this.fullQuoteMap[key]
            }
        }
    }

    readFromExternalFile() {

    }
}
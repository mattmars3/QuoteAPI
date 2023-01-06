import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path'
import Quote from './Quote.js'

export default class QuoteManager {
    constructor(quoteFilePath="./QUOTEMASTERLIST.json") {
        this.quoteFilePath = quoteFilePath;
        this.fullQuoteMap = this.readList();
    }

    // writes the list to the master file
    writeList() {
        // IMPROVE THIS BY USING THE PATH MODULE
        fs.writeFileSync(this.quoteFilePath, JSON.stringify(this.fullQuoteMap))
    }

    // adds a field to the FileManager
    appendQuote(quoteObject) {

        // if (this.fullQuoteMap == undefined) {throw "QuoteMap is undefined. Ensure that the readlist method is functioning properly as that often causes the this.fullQuoteMap field to be undefined."}
        // hash the quote body        
        let hashQuoteBody = quoteObject.quoteBody;
        let hashedQuote = crypto.createHash('md5').update(hashQuoteBody).digest('hex').toString();

        // check if quote is already in list
        let inList = false;

        for (let key in quoteObject) {
            try {
                if (hashedQuote == this.fullQuoteList[key]) {
                    inList = true;
                }
            } catch {}
        }

        // if the key is not already in the list
        if (inList != true) {
            // create a field for it in the list and set it equal to the stringified quote
            this.fullQuoteMap[hashedQuote] = JSON.stringify(quoteObject);
        }
    }

    // returns list of quote objects
    readList() {
        // read the file data from the master file
        try {
            const quoteJSONText = fs.readFileSync(this.quoteFilePath);
            const jsonData = JSON.parse(quoteJSONText);
            // parse the json data and create quote objects
            // iterate through the object
            for (let key in jsonData) {
                let jsonQuote = JSON.parse(jsonData[key]);

                this.appendQuote(
                    new Quote(jsonQuote.quoteBody, jsonQuote.quoteCategory, jsonQuote.writer, jsonQuote.quoteSource)
                )
            }
        } catch {
            this.fullQuoteMap = {}
        }

    }

}
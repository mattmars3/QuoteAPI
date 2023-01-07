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
        if (this.fullQuoteMap == undefined) {this.fullQuoteMap = {}}         
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
    
    createQuoteFromJSON(jsonQuote) {
        let quoteObj = new Quote(jsonQuote.quoteBody, jsonQuote.quoteCategory, jsonQuote.writer, jsonQuote.quoteSource)
        return quoteObj;
    }

    // returns list of quote objects
    readList() {
        // read the file data from the master file
        try {
            // read the file into a variable
            const quoteJSONText = fs.readFileSync(this.quoteFilePath);
            // parse the json data
            const jsonData = JSON.parse(quoteJSONText);
            
            if (jsonData == {}) {throw "asdf"}

            // iterate through the object
            for (let key in jsonData) {
                let jsonQuote = JSON.parse(jsonData[key]);

                this.appendQuote(
                    this.createQuoteFromJSON(jsonQuote)
                )
            }
        } catch {
            console.log("JSON Parsing failed")
            // if the code above fails it is probably because the file is empty
            // if it is then it will be set to a bare object. Recover could also result
            this.fullQuoteMap = {}
        }
    }
    
    printAllQuotes() {
        for (let key in this.fullQuoteMap) {
            let quoteData = this.fullQuoteMap[key]
            console.log(quoteData)
        }
    }
    
    debugPrint() {
        console.log(this.fullQuoteMap)
    }
}
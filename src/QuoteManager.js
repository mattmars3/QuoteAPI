import {createHash} from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import Quote from './Quote.js'
import QuoteList from './QuoteList.js';
import path from 'path';
import { readdirSync } from 'fs';
import { dir } from 'console';

export default class QuoteManager {
    constructor(quoteFilePath="./QUOTEMASTERLIST.json") {
        this.quoteFilePath = quoteFilePath;
        
        // read the file and put quotes into the quotemap immediately
        // Object that stores key value pairs
        // the key is the hashed body of the quote and value is the quote object
        // VALUE IS STORED AS JSON NOT QUOTE OBJECTS
        this.fullQuoteMap = {};
    }

    // adds a quote object to the QuoteManager full object
    addQuote(quoteObject) {
        // hash the quote body        
        let hashQuoteBody = quoteObject.quoteBody;
        let hashedQuote = createHash('md5').update(hashQuoteBody).digest('hex').toString();

        // make sure that this quote does not already exist in the object
        // THIS MIGHT NOT BE NECESSARY
        if (!Object.keys(this.fullQuoteMap).includes(hashedQuote)) {
            // add the key and value to the object
            this.fullQuoteMap[hashedQuote] = quoteObject;
        }
    }

    // reads from master file and updates Quote Manager's QuoteMap
    // must call this to get all stored in file
    readListFromFile() {
            this.fullQuoteMap = {}
            // read file data into a variable
            const quoteJSONText = readFileSync(this.quoteFilePath);
            // parse the json data
            const jsonData = JSON.parse(quoteJSONText);

            // iterate through the object
            for (let key in jsonData) {
                this.fullQuoteMap[key] = Quote.quoteFromJSON(jsonData[key]);
            }
    }
    
    // writes the list to the master file
    writeQuotes() {
        // IMPROVE THIS BY USING THE PATH MODULE
        writeFileSync(this.quoteFilePath, JSON.stringify(this.fullQuoteMap))
    }

    // returns the quote object given hash value
    getQuoteByHash(hash) {
        return this.fullQuoteMap[hash];
    }
    
    // returns the quote object given a substring
    getQuoteBySubstring(substr) {
        const hash = this.getQuoteHashBySubstring(substr);
        return Quote.quoteFromJSON(this.fullQuoteMap[hash])
    }
    
    // returns the hash for a substring value
    getQuoteHashBySubstring(substr) {
        for (let key in this.fullQuoteMap) {
            if (this.fullQuoteMap[key].quoteBody.includes(substr)) {
                return key;
            }
        }
    }

    // prints all quotes in quoteList
    printAllQuotes() {
        for (let key in this.fullQuoteMap) {
            let quoteData = this.fullQuoteMap[key]
            console.log(Quote.quoteFromJSON(quoteData).toString());
        }
    }

    // returns array of quote objects
    getQuotesArray() {
        let arrayOfQuotes = [];
        for (let key in this.fullQuoteMap) {
            let quoteData = this.fullQuoteMap[key];
            arrayOfQuotes.push(Quote.quoteFromJSON(quoteData)); 
        }
        return arrayOfQuotes;
    }

    // returns random quote
    getRandomQuote() {
        let quotesArr = this.getQuotesArray();
        let randInd = Math.floor(Math.random() * quotesArr.length);
        return quotesArr[randInd];
    }

    // removes the first quote containing the substring
    removeQuote(substr) {
        for (let key in this.fullQuoteMap) {
            if (this.fullQuoteMap[key].quoteBody.includes(substr)) {
                delete this.fullQuoteMap[key]
            }
        }
    }

    // EXAMPLE QUOTE FORMAT: "I found blood and I saw stars All in the backseat of your car." -Andrew VanWyngarden (Indie Rokkers) : Growing up
    // reads quotes from an external text file and adds them to map
    // NOTE: this method is very strict about formatting. I could possibly add a linting function that would ensure proper format beforehand
    readFromExternalFile(filePath) {
        // split file by newlines
        const quoteFile = readFileSync(filePath, 'ascii')
        const quotesList = quoteFile.split("\n")
        
        // list of quote objects created
        let quoteList = [];
    
        // for each line in the file, try and create a quote object out of it
        for (let lineNum in quotesList) {
            let currentQuote = quotesList[lineNum]

            // if first character isn't quote then just skip the line
            if (currentQuote[0] != '"') {
                continue;
            }

            let quoteConstructorArgList = []

            // search for final double quote
            

            // if the index = -1, then it doesn't exist and is not a well structured quote so it is omitted

            // push the body of the quote
            const quoteBody = currentQuote.substring(1, secondDoubleQuoteIndex+1)
            quoteConstructorArgList.push(quoteBody)
            
            // get rid of body as it's not necessary anymore
            currentQuote = currentQuote.substring(secondDoubleQuoteIndex + 4);

            // get the writer
            const openParenIndex = currentQuote.indexOf("(");
            const writer = currentQuote.substring(0, openParenIndex-1);
            quoteConstructorArgList.push(writer);
            currentQuote = currentQuote.substring(openParenIndex+1)

            // get the quote source
            const endParenIndex = currentQuote.indexOf(")");
            const quoteSource = currentQuote.substring(0, endParenIndex);
            quoteConstructorArgList.push(quoteSource)

            // push the quote category
            const quoteCategory = currentQuote.substring(endParenIndex + 4).trim();
            quoteConstructorArgList.push(quoteCategory);
            
            // create a quote object with this information
            console.log(quoteConstructorArgList)
            quoteList.push(new Quote(quoteConstructorArgList[0], quoteConstructorArgList[1], quoteConstructorArgList[2], quoteConstructorArgList[3]))
        }

        // append all these quotes
        for (let quoteInd in quoteList) {
            this.addQuote(quoteList[quoteInd]);
        }
    }
}
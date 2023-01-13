import { json } from 'express';
import {existsSync, write} from 'fs'
import { readFileSync, writeFileSync } from 'fs';

export default class QuoteList {
    constructor(quoteListName, quoteHashes=[]) {

        // set the name of the quoteList
        this.quoteListName = quoteListName;
        
        // get rid of file ending in name
        const periodIndex = quoteListName.indexOf(".")
        if (periodIndex != -1) {
            quoteListName = quoteListName.substring(0, periodIndex);
        }

        // set the filepath to its folder + the name of the list
        this.filepath = "./quoteLists/" + quoteListName + ".json";

        // manage the save file
        if (!existsSync(this.filepath)) {
            // create it
            writeFileSync(this.filepath, JSON.stringify([]))
        } 
        

        // read the file
        try {
            const existingData = this.readFromFile();
            this.quoteList = existingData;
        } catch {
            // if you can't read it, it's probably because it exists but is empty. Set it to []
            console.error("Failed to read save file for " + quoteListName + " quoteList.")
            this.quoteList = [];
        }
            
        // add all the quoteHashes to the list
        for (let key in quoteHashes) {
            let item = quoteHashes[key]
            
            // PUSH TO THE LIST ONLY IF IT ISN'T IN THE LIST ALREADY
            this.quoteList.push(item)
        }
    }

    writeToFile() {
        const jsonQuoteList = JSON.stringify(this.quoteList)
        console.log("QuoteList field: " + jsonQuoteList)
        writeFileSync(this.filepath, jsonQuoteList);
    }

    readFromFile() {
        const quoteList = JSON.parse(readFileSync(this.filepath));
        return quoteList;
    }

    addQuote() {

    }

    removeQuote() {

    }
}
/* 
    The increases in technology have not benefitted the human race.
    We work hard, we work harder, we work longer. We have no time to 
    realize why we are here... our purpose, our goal, our vision. 
    So then we look at the sun. -Serj Tankian (System of a Down)
*/

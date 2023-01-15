export default class Quote {
    // quote origin is where the quote came from. I.E. what movie, song, etc. Song title more movie name should be used if possible
    constructor(quoteBody, quoteCategory, writer="", quoteSource="", explicit=false) {
        quoteBody = quoteBody.trim();
        
        // get rid of quotation marks in quote as they will cause problems in serialization
        if (quoteBody[0] == '"') {
            quoteBody = quoteBody.substring(1, quoteBody.length);
        }
        if (quoteBody[quoteBody.length-1] == '"') {
            quoteBody = quoteBody.substring(0, quoteBody.length-1);
        }

        // if quote body doesn't have a period, add one
        let finalChar = quoteBody[quoteBody.length-1].trim();
        if (finalChar != "?" && finalChar != "!" && finalChar != ".") {
            quoteBody += ".";
        }
        
        // assign all fields 
        this.quoteBody = quoteBody;
        this.quoteSource = quoteSource;
        this.quoteCategory = quoteCategory;
        
        // this is very vague and can be a speaker or an actor or artist
        this.writer = writer;
        
        // whether or not the quote is explicit.
        this.explicit = explicit;
    }    

    // takes in a serialized Quote object and returns a real quote object
    static quoteFromJSON(quoteJSON) {
        return new Quote(quoteJSON.quoteBody, quoteJSON.quoteCategory, quoteJSON.writer, quoteJSON.quoteSource, quoteJSON.explicit);
    }
    
    // converts a quote object to a displayable string
    toString() {
        let theString = '"';
        theString += this.quoteBody;
        // since quote is already stored with ending punctuation none is needed
        theString += '"';
        if (this.writer != "") {
            theString += " -" + this.writer;
        }
        if (this.quoteSource != "") {
            theString += " (" + this.quoteSource + ")";
        }

        theString += " : " + this.quoteCategory;
        theString += " : " + this.explicit;
        return theString;
    }
}
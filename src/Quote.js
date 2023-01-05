class Quote {
    
    // quote origin is where the quote came from. I.E. what movie, song, etc. Song title more movie name should be used if possible
    constructor(quoteBody, quoteSource, quoteCategory, writer="", singer="", actor="") {
        quoteBody = quoteBody.trim();
        
        // get rid of quotation marks in quote as they will cause problems in serialization
        if (quoteBody[0] == '"') {
            quoteBody = quoteBody.substring(1, quoteBody.length);
        }
        if (quoteBody[quoteBody.length-1] == '"') {
            quoteBody = quoteBody.substring(0, quoteBody.length-1);
        }
        
        // if quote body doesn't have a period, add one
        let finalChar = quoteBody[quoteBody.length-1];
        if (finalChar != "?" || finalChar != "!" || finalChar != ".") {
            quoteBody += ".";
        }
        
        // assign all fields 
        this.quoteBody = quoteBody;
        this.quoteSource = quoteSource;
        this.quoteCategory = quoteCategory;
        this.writer = writer;
        this.singer = singer;
        this.actor = actor;
    }    
    

    // "Poker Face" - Lady Gaga (Poker Face)
    // "this consumerism quote" - Tyler Durden (Fight Club)
    
    toString() {
        let theString = '"';
        theString += this.quoteBody;
        theString += '" - '; 
    }
    
    fromText(line) {
        
    }
}
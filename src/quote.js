export class Quote {
    constructor(quoteBody, quoteWriter="", quoteOrigin="") {
        // this is the body of the quote
        this.quoteBody = quoteBody.trim();

        // this is whoever said the quote
        // if there are multiple, they should be separated by a forward slash
        this.quoteWriter = quoteWriter.trim();

        // this is where the quote came from. Movie name, song name, etc
        this.quoteOrigin = quoteOrigin.trim();
    }

    toString() {
        let quoteString = "";
        quoteString += this.quoteBody;

        if (this.quoteWriter != "") {
            quoteString += " -" + this.quoteWriter;
        }
        if (this.quoteOrigin != "") {
            quoteString += " (" + this.quoteOrigin + ")";
        }
        return quoteString;
    }

}
import { Quote } from './quote.js'

function test() {
    let quote = new Quote("Without pain, without sacrifice, we would have nothing.", "Tyler Durden", "Fight Club") 

    console.log(quote.toString())
}

test();
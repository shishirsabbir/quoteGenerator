// targeting DOM elements

const mainContent = document.getElementById('main');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const copyBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

// declaring the main global variable array
let apiQuotes = [];


// loading function

// show loading
function loading() {
    loader.hidden = false;
    mainContent.hidden = true;
}

// hide loading
function complete() {
    mainContent.hidden = false;
    loader.hidden = true;
}

// manupulating DOM

function newQuote() {

    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 90) {
        quoteText.classList.add('long_quote');
    } else {
        quoteText.classList.remove('long_quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

// get quotes from api

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        newQuote();
        // console.log(apiQuotes);
    }

    catch (error) {
        // catch errors here
    }
}



// tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}



// events
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();
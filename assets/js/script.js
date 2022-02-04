// GLOBAL VARIABLES
let facebookCurrentPrice = document.querySelector('#facebook-current-price')
let facebookPriceChange = document.querySelector('#facebook-price-change')
let appleCurrentPrice = document.querySelector('#apple-current-price');
let applePriceChange = document.querySelector('#apple-price-change');
let amazonCurrentPrice = document.querySelector('#amazon-current-price');
let amazonPriceChange = document.querySelector('#amazon-price-change');
let netflixCurrentPrice = document.querySelector('#netflix-current-price');
let netflixPriceChange = document.querySelector('#netflix-price-change');
let googleTicker = document.querySelector('#google-ticker');
let googleName = document.querySelector('#google-name');
let googleCurrentPrice = document.querySelector('#google-current-price');
let googlePriceChange = document.querySelector('#google-price-change');
let submitBtn = document.querySelector('button');
let input = document.querySelector('#stock-input');
let savedStocksWatchlistEl = document.querySelector('#new-saved-stocks-watchlist');
let newsHeader = document.querySelector('#news-article-header');

// SEARCH STOCK WHEN USER PRESSES 'ENTER' KEY
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getSearchedStock();
        e.currentTarget.value = '';
    };
});

// GETTING SEARCHED STOCK VALUE
async function getSearchedStock() {
    let searchValue = input.value;
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=${searchValue}&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    if (data.d === null) {
        savedStocksWatchlistEl.textContent = 'ERROR'
    } else {
        savedStocksWatchlistEl.innerHTML = '';
        let currentPriceLi = document.createElement('li');
        currentPriceLi.textContent = data.c;
        let priceChangeLi = document.createElement('li');
        let ul = document.createElement('ul');
        ul.append(currentPriceLi, priceChangeLi);
        let button = document.createElement('button');
        button.textContent = searchValue;
        button.append(ul);
        savedStocksWatchlistEl.append(button);
        button.classList.add('ticker');
        currentPriceLi.classList.add('current-price');
        priceChangeLi.classList.add('price-change');
        if (data.d > 0) {
            priceChangeLi.classList.add('gain')
            priceChangeLi.textContent = `+${data.d.toFixed(2)}`;
        } else {
            priceChangeLi.classList.add('loss');
            priceChangeLi.textContent = `${data.d.toFixed(2)}`;
        };
    };
}; 

// WATCH LIST FACEBOOK STOCK
async function getFacebookStockQuote() {
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=FB&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    facebookCurrentPrice.textContent = data.c.toFixed(2);
    if (data.d > 0) {
        facebookPriceChange.classList.remove('loss');
        facebookPriceChange.textContent = `+${data.d.toFixed(2)}`;
    } else {
        facebookPriceChange.classList.remove('gain');
        facebookPriceChange.textContent = `${data.d.toFixed(2)}`;
    };
};

// WATCH LIST APPLE STOCK
async function getAppleStockQuote() {
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=AAPL&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    appleCurrentPrice.textContent = data.c.toFixed(2);
    if (data.d > 0) {
        applePriceChange.classList.remove('loss');
        applePriceChange.textContent = `+${data.d.toFixed(2)}`;
    } else {
        applePriceChange.classList.remove('gain');
        applePriceChange.textContent = `${data.d.toFixed(2)}`;
    };
};

// WATCH LIST AMAZON STOCK
async function getAmazonStockQuote() {
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=AMZN&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    amazonCurrentPrice.textContent = data.c.toFixed(2);
    if (data.d > 0) {
        amazonPriceChange.classList.remove('loss');
        amazonPriceChange.textContent = `+${data.d.toFixed(2)}`;
    } else {
        amazonPriceChange.classList.remove('gain');
        amazonPriceChange.textContent = `${data.d.toFixed(2)}`;
    };
};

// WATCH LIST NETFLIX STOCK
async function getNetflixStockQuote() {
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=NFLX&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    netflixCurrentPrice.textContent = data.c.toFixed(2);
    if (data.d > 0) {
        netflixPriceChange.classList.remove('loss');
        netflixPriceChange.textContent = `+${data.d.toFixed(2)}`;
    } else {
        netflixPriceChange.classList.remove('gain');
        netflixPriceChange.textContent = `${data.d.toFixed(2)}`;
    };
};

// WATCH LIST GOOGLE STOCK
async function getGoogleStockQuote() {
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=GOOGL&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    googleCurrentPrice.textContent = data.c.toFixed(2);
    if (data.d > 0) {
        googlePriceChange.classList.remove('loss');
        googlePriceChange.textContent = `+${data.d.toFixed(2)}`;
    } else {
        googlePriceChange.classList.remove('gain');
        googlePriceChange.textContent = `${data.d.toFixed(2)}`;
    };
};

getFacebookStockQuote();
getAppleStockQuote();
getAmazonStockQuote();
getNetflixStockQuote();
getGoogleStockQuote();


// NEWS API
async function getRelatedNews() {
    let newsUrl = `https://api.marketaux.com/v1/news/all?symbols=FB,APPL,AMZN,NFLX,GOOGL&filter_entities=true&language=en&api_token=cT7GXdDSIcLAs41UKBeGY5odMkxy6XrcQupPMK4Q`
    let response = await fetch(newsUrl);
    let data = await response.json();
    console.log(data);
}
getRelatedNews();
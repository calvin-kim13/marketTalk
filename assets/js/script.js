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

// STOCK CARD VARIABLES
let stockContainerEl = document.querySelector('.stock-card');
let stockSymbolHeaderEl = document.querySelector('.stock-symbol-header');
let stockTickerEl = document.querySelector('.stock-ticker');
let stockNameEl = document.querySelector('.stock-name');
let priceContainerEl = document.querySelector('.card-price');
let cardCurrentPriceEl = document.querySelector('.card-current-price');
let cardPriceChangeEl = document.querySelector('.card-price-change');
let annualHighLowContainerEl = document.querySelector('.card-high-low');
let annualHighLowHeaderEl = document.querySelector('.year-low-high-header');
let yearLowHighDateEl = document.querySelector('.low-high-dates');
let lowDateEl = document.querySelector('.low-date');
let highDateEl = document.querySelector('.high-date');
let yearLowHighPricesEl = document.querySelector('.low-high-prices');
let lowPriceEl = document.querySelector('.low-price');
let highPriceEl = document.querySelector('.high-price');
let basicFinancialContainerEl = document.querySelector('.basic-financials');
let marketCapContainerEl = document.querySelector('.market-cap');
let marketCapHeaderEl = document.querySelector('.market-cap-header');
let marketCapNumberEl = document.querySelector('.market-cap-number');
let peContainerEl = document.querySelector('.pe-ratio');
let peHeaderEl = document.querySelector('.pe-header');
let peNumberEl = document.querySelector('.pe-number');
let epsContainerEl = document.querySelector('.eps');
let epsHeaderEl = document.querySelector('.eps-header');
let epsNumberEl = document.querySelector('.eps-number');
let yieldContainerEl = document.querySelector('.yield');
let yieldHeaderEl = document.querySelector('.yield-header');
let yieldNumberEl = document.querySelector('.yield-number');
let betaContainerEl = document.querySelector('.beta');
let betaHeaderEl = document.querySelector('.beta-header');
let beatNumberEl = document.querySelector('.beta-number');

stockContainerEl.classList.remove('stock-card')

// SEARCH STOCK WHEN USER PRESSES 'ENTER' KEY
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getSearchedStockPrice(e)
        searchStockName(e);
        getBasicFinancial(e);
        e.currentTarget.value = '';
    };
});

// GET BASIC FINANCIAL WHEN STOCK IS SEARCHED 
async function getBasicFinancial(e) {
    e.preventDefault();
    let searchValue = input.value;
    let basicFinancialUrl = `https://finnhub.io/api/v1/stock/metric?symbol=${searchValue}&metric=all&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(basicFinancialUrl);
    let data = await response.json();
    stockTickerEl.textContent = data.symbol;
    annualHighLowHeaderEl.textContent = '52 Week Low - 52 Week High';
    lowPriceEl.textContent = data.metric['52WeekLow'];
    highPriceEl.textContent = data.metric['52WeekHigh'];
    marketCapHeaderEl.textContent = 'Mkt Cap'
    marketCapNumberEl.textContent = `${data.metric.marketCapitalization}B`;
    peHeaderEl.textContent = 'P/E';
    peNumberEl.textContent = data.metric.peBasicExclExtraTTM.toFixed(2);
    epsHeaderEl.textContent = 'EPS';
    epsNumberEl.textContent = data.metric.epsExclExtraItemsTTM.toFixed(2);
    if (data.metric.dividendYieldIndicatedAnnual === null) {
        yieldHeaderEl.textContent = 'Yield'
        yieldNumberEl.textContent = '-'
    } else {
        yieldHeaderEl.textContent = 'Yield';
        yieldNumberEl.textContent = data.metric.dividendYieldIndicatedAnnual.toFixed(2);
    }
    betaHeaderEl.textContent = 'Beta';
    beatNumberEl.textContent = data.metric.beta.toFixed(2);
    stockContainerEl.classList.add('stock-card')
};

// GETTING SEARCHED STOCK PRICES
async function getSearchedStockPrice(e) {
    e.preventDefault();
    let searchValue = input.value;
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=${searchValue}&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    if (data.d === null) {
        stockSymbolHeaderEl.textContent = 'ERROR'
    } else {
        cardCurrentPriceEl.textContent = data.c
        cardPriceChangeEl.textContent = data.d
        cardCurrentPriceEl.classList.add('current-price');
        cardPriceChangeEl.classList.add('price-change');
        if (data.d > 0) {
            cardPriceChangeEl.classList.add('gain')
            cardPriceChangeEl.textContent = `+${data.d.toFixed(2)}`;
        } else {
            cardPriceChangeEl.classList.add('loss');
            cardPriceChangeEl.textContent = `${data.d.toFixed(2)}`;
        };
    };
}; 

// GETTING NAME OF STOCK AND SYMBOL
async function searchStockName(e) {
    e.preventDefault();
    let searchValue = input.value;
    let stockSymbolUrl = `https://finnhub.io/api/v1/search?q=${searchValue}&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockSymbolUrl);
    let data = await response.json();
    stockNameEl.textContent = data.result[0].description
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
async function getRelatedNews(e) {
    e.preventDefault();
    let newsUrl = `https://api.marketaux.com/v1/news/all?symbols=FB,APPL,AMZN,NFLX,GOOGL&filter_entities=true&language=en&api_token=cT7GXdDSIcLAs41UKBeGY5odMkxy6XrcQupPMK4Q`
    let response = await fetch(newsUrl);
    let data = await response.json();
    console.log(data);
}
// getRelatedNews();
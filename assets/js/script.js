// ASIDE VARIABLES
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

// NEWS VARIABLES
let marketauxKey = "scotzkxoU6tor1UNg3otiealSCuIJVvVfFEva6Yj";
let latestNewsEl = document.querySelector('#latest-news-header');
let parentNewsContainerEl = document.querySelector('#png-latest-news-container');

// FUNCTION TO GET DATE, WITH A DIFFERENCE OF `difference` days
var getDateDifference = function(difference) {
    let today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDay()-difference);
    return lastWeek.toISOString().slice(0,10);
}

// GET TODAY'S DATE; SUBTRACT 7 DAYS FROM IT.
let firstDate = getDateDifference(7);

var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}

var displayNewsCards = function(newsObject) {
    newsObject.data.forEach(result => {
        createNewsCards(result);
    })
}

// FUNCTION THAT GETS THE TRENDING NEWS. TAKES DATE AND THE PAGE NUMBER
async function getTrendingNews(dateOf) {
    let trendingStocksURL = `https://api.marketaux.com/v1/news/all?&language=en&countries=us&language=en&published_after=${dateOf}&page=${getRandomInt(1, 100)}&api_token=${marketauxKey}`;
    let response = await fetch(trendingStocksURL);
    let news = await response.json();

    displayNewsCards(news);

    console.log(news);
}

// FUNCTION THAT DYNAMICALLY CREATES NEWS CARDS 
var createNewsCards = function(newsArticles) {
    let cardFormatEl = document.createElement('div');
        cardFormatEl.classList = 'box news-article-box';

        let newsContainerEl = document.createElement('article');
        newsContainerEl.classList.add('media')
        cardFormatEl.append(newsContainerEl);
        
        let newsContainerFormatEl = document.createElement('div');
        newsContainerFormatEl.classList.add('media-left');
        newsContainerEl.append(newsContainerFormatEl);

        let newsImageContainerEl = document.createElement('figure');
        // newsImageContainerEl.classList = 'has-image-centered';
        newsContainerFormatEl.append(newsImageContainerEl);

        let imageEl = document.createElement('img');
        // Class image for css styling. Change if need be.
        imageEl.classList = 'news-img';
        // If the image is loaded, make the image url from the API
        if(imageLoaded(imageEl)) {
            imageEl.setAttribute('src', newsArticles['image_url']);
        } else { // Otherwise, make it the stock image
            imageEl.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfcFnHFv_0MtuEj0kDcrrefVzmL_oxTsDKw&usqp=CAU');
        }
        console.log(imageLoaded(imageEl));
        imageEl.setAttribute('alt', newsArticles['title'] + ' Image');
        newsImageContainerEl.append(imageEl);

        let newsTextFormatEl = document.createElement('div');
        newsTextFormatEl.classList.add('media-content');
        newsTextFormatEl.classList = 'news-text-content'

        let newsContentFormatEl = document.createElement('div');
        newsContentFormatEl.classList = 'content main-content';
        newsTextFormatEl.append(newsContentFormatEl);
        
        let newsLinkEl = document.createElement('a');
        // News article title. Change the class if you need to for CSS styling
        newsLinkEl.classList = 'news-header'
        newsLinkEl.setAttribute('href', newsArticles['url']);
        newsLinkEl.setAttribute('target', '_blank');
        newsLinkEl.append(newsArticles['title']);
        newsContentFormatEl.append(newsLinkEl);

        let newsDescriptionFormatEl = document.createElement('div');
        newsDescriptionFormatEl.classList = 'content mx-4';
        // If the article has no description, warn the user. 
        if (newsArticles['description'] === '') {
            newsDescriptionFormatEl.append('This article has no description.');
        } else { // Otherwise, use the API's description for the article
            newsDescriptionFormatEl.append(newsArticles['description']);
        }

        insertAfter(cardFormatEl, latestNewsEl);
        insertAfter(newsTextFormatEl, newsContainerFormatEl);
        insertAfter(newsDescriptionFormatEl, newsContentFormatEl);
}

// FUNCTION TO REMOVE NEWS CARDS
var removeNewsCards = function(parentElement) {
    for (let i=0; i<3;i++) {
        let lastChild = parentElement.lastElementChild;
        parentElement.removeChild(lastChild);
    }
}

// HIDE STOCK SCREENER
hideMoreStockInfo = function() {
  stockContainerEl.classList.remove('stock-card');
  annualHighLowContainerEl.classList.remove('card-high-low')
  lowPriceEl.classList.remove('low-price');
  highPriceEl.classList.remove('high-price');
}

// SEARCH STOCK WHEN USER PRESSES 'ENTER' KEY
input.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getSearchedStockPrice(e)
        searchStockName(e);
        getBasicFinancial(e);
        searchStockNews(e);
        e.currentTarget.value = '';
        annualHighLowContainerEl.classList.add('card-high-low')
    };
});

// FUNCTION THAT RETRIEVES THE STOCK SYMBOL AND PRINTS NEWS
async function searchStockNews(e) {
    e.preventDefault();
    removeNewsCards(parentNewsContainerEl);
    let searchValue = input.value;
    let newsStockSearchURL = `https://api.marketaux.com/v1/news/all?symbols=${searchValue}&filter_entities=true&language=en&api_token=${marketauxKey}`;
    let response = await fetch(newsStockSearchURL);
    let news = await response.json();
    displayNewsCards(news);
}

// FUNCTION THAT WILL SHORTEN LARGE NUMBERS
var rewriteNumber = function(number, maxDigit, forceDigit, unit) {
    let roundedNumber = 0;
    switch(unit) {
        case "Tr":
            roundedNumber = number/1e12;
            break;
        case "B":
            roundedNumber = number/1e9;
            break;
        case "M":
            roundedNumber = number/1e6;
            break;
        case "K":
            roundedNumber = number/1e3;
            break;
        case "":
            roundedNumber = number;
            break;
    }
    if (maxDigit !== false) {
        let tempValue = new RegExp('\\.\\d{' + (maxDigit + 1) + ',}$');
        if (tempValue.test(('' + roundedNumber))) {
            roundedNumber = roundedNumber.toFixed(maxDigit);
        }
    }
    if (forceDigit !== false) {
        roundedNumber = Number(roundedNumber).toFixed(forceDigit);
    }
    return roundedNumber + ' ' + unit;
}

// HELPER FUNCTION OF `rewriteNumber` FUNCTION
var abbreviateNumber = function(number, maxDigit, forceDigit, forceUnit) {
    number = Number(number);
    forceUnit = forceUnit || false;
    if(forceUnit !== false) {
        return rewriteNumber(number, maxDigit, forceDigit, forceUnit);
    }
    let unit;
    if (number >= 1e12) unit = "Tr";
    else if (number >= 1e9) unit = "B";
    else if (number >= 1e6) unit = 'M';
    else if (number >= 1e3) unit = 'K';
    else {
        unit = "";
    }
    return rewriteNumber(number, maxDigit, forceDigit, unit);
}

// GET BASIC FINANCIAL WHEN STOCK IS SEARCHED 
async function getBasicFinancial(e) {
    e.preventDefault();
    let searchValue = input.value;
    let basicFinancialUrl = `https://finnhub.io/api/v1/stock/metric?symbol=${searchValue}&metric=all&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(basicFinancialUrl);
    let data = await response.json();
    stockTickerEl.textContent = data.symbol;
    annualHighLowHeaderEl.textContent = '52W Low - 52W High';
    lowPriceEl.textContent = data.metric['52WeekLow'].toFixed(2);
    highPriceEl.textContent = data.metric['52WeekHigh'].toFixed(2);
    marketCapHeaderEl.textContent = 'Mkt Cap'
    // API's market cap
    console.log(data.metric.marketCapitalization);
    marketCapNumberEl.textContent = `${abbreviateNumber(Math.round(data.metric.marketCapitalization) * 1000000, 2, 2, false)}`;
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
    lowPriceEl.classList.add('low-price');
    highPriceEl.classList.add('high-price');
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
            cardPriceChangeEl.classList.remove('loss')
            cardPriceChangeEl.textContent = `+${data.d.toFixed(2)}`;
        } else {
            cardPriceChangeEl.classList.add('loss');
            cardPriceChangeEl.classList.remove('gain');
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

// FUNCTION TO INSERT AN HTML ELEMENT AS A SIBLING TO A REFERENCE ELEMENT
var insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// FUNCTION THAT WILL INITIALIZE EVERYTHING
var initialize = function() {
    hideMoreStockInfo()
    getTrendingNews(firstDate);
    getTrendingNews(firstDate);
    getFacebookStockQuote();
    getAppleStockQuote();
    getAmazonStockQuote();
    getNetflixStockQuote();
    getGoogleStockQuote();
}

// FUNCTION TO CHECK IF THE IMAGE HAS BEEN PROPERLY LOADED ONTO THE WEB PAGE
var imageLoaded = function(image) {
    return !(image.complete && (image.naturalWidth !== 0));
}

// CALLING THE INITIALIZE FUNCTION
initialize();
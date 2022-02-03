
async function getStockQuote() {
    let stockQuoteUrl = `https://finnhub.io/api/v1/quote?symbol=MSFT&token=c7tl5miad3i8dq4u5t50`;
    let response = await fetch(stockQuoteUrl);
    let data = await response.json();
    console.log(data)
}
getStockQuote()
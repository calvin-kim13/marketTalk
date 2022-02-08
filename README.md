# stockNerds

## Description
The webpage is a financial website using stock screeners and also displays financial news related to the top companies in the world. Users can add and remove stocks to and from their watchlist so that their favorite stocks can be saved in the sidebar. When the user clicks on or searches for a stock, the stock chart, information, and news are displayed.

We used two different APIs to pull data about stock financial ratios and financial news. The stock data acts as the aside on the web page and the main content carries the financial news. The news updates everytime a user searches a stock and gets news that is relevant to the stock searched.

## Screenshot:
---
![Alt text](/assets/img/screenshot.png "Optional Title")

## User Story:
---
AS A USER,  
I WANT to be able to search for a company  
SO THAT I can view the current stock price and news associated with that company  

## Acceptance Criteria:
---
GIVEN the website  
WHEN the user first loads the website  
THEN the user should see a sidebar with a search bar, screenings of the FAANG stock prices, and latest financial news as the main content  
WHEN the user searches a company  
THEN the company stock price, financial ratios, and news should show as the main content in place of the financial news  
WHEN the user clicks the header link after they search a company  
THEN the user should be taken back to the homepage    

## API urls:
---
STOCK SCREENING:
- https://finnhub.io/docs/api/symbol-search

FINANCIAL NEWS:
- https://www.marketaux.com/

## Live urls:
---
GITHUB:
- https://github.com/calvin-kim13/stockNerds

WEB PAGE:
- https://calvin-kim13.github.io/stockNerds/
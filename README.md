# stockNerds

## Description
The webpage is a financial website using stock screeners and also displays financial news related to the top companies in the world. Users can add and remove stocks to and from their watchlist so that their favorite stocks can be saved in the sidebar. When the user clicks on or searches for a stock, the stock chart, information, and news are displayed.

## User Story:
---
AS A USER,  
I WANT to be able to search for a company  
SO THAT I can view the current stock price and news associated with that company  
I WANT to be able to save certain companies to my "watchlist"  
SO THAT I can quickly view the company information without searching for it again  

## Acceptance Criteria:
---
GIVEN the website  
WHEN the user first loads the website  
THEN the user should see a sidebar with a search bar, screenings of the major index stock prices, and latest financial news as the main content  
WHEN the user searches a company  
THEN the company stock price, chart, financial ratios, and news should show as the main content in place of the financial news  
WHEN the user clicks the home link after they search a company  
THEN the user should be taken back to the homepage  
WHEN the user adds the company into their watchlist  
THEN the user should be able to see the company saved in the sidebar under the major index prices  
WHEN the user clicks remove company from watchlist  
THEN the company should be removed from the watchlist  
WHEN the user clicks on a card article  
THEN the user will be shown the content of the article   

## API urls:
---
STOCK SCREENING:
- https://finnhub.io/docs/api/symbol-search

FINANCIAL NEWS:
- https://www.marketaux.com/


# MyReads Project

This is the final assessment project for Udacity's React Fundamentals course. The project consists os a series of interactive book shelfs ('Currently Reading', 'Want to Read' and 'Read') that allow a user to organize and plan on reading books.

## How it works
To change the place of a book, use the little widget in its bottom-right corner. To transfer books between shelfs, pick the destination shelf among the available options. To remove completely a book from all shelfs use the option 'None'.

Additionally, it is possible to add new books to any shelf by going to the search page through the 'Add a Book' link at the bottom-right of the page, entering some search keywords in the form and using the book widget in any of the results to choose a destination shelf.

## Getting Started

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

import React from 'react'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Book from './Book'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchBooks: [],
    query: ''
  }

  updateQuery = (query) => {
    BooksAPI.search(query).then(
      (books) => {
        this.setState(() =>({
          searchBooks: Array.isArray(books) ? books : [],
          query: query.trim()
        }));
      }
    )
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      (books) => {
        this.setState(() => ({
          currentlyReading: books.filter((book) => (book.shelf === 'currentlyReading')),
          wantToRead: books.filter((book) => (book.shelf === 'wantToRead')),
          read: books.filter((book) => (book.shelf === 'read')),
        }))
      }
    )
  }

  move(bookId, origin, destination) {
    var source = origin !== 'none' ? origin : 'searchBooks'
    this.setState(() => ({
      [origin]: origin !== 'none' && this.state[origin].filter((book) => (book.id !== bookId)),
      [destination]: destination !== 'none' && this.state[destination].concat(this.state[source].filter((book) => (book.id === bookId))),
    }))
  }

  getBookShelf(bookId) {
    if (this.state.currentlyReading.filter((book) => (book.id === bookId)).length > 0) {
      return 'currentlyReading'
    }
    if (this.state.wantToRead.filter((book) => (book.id === bookId)).length > 0) {
      return 'wantToRead'
    }
    if (this.state.read.filter((book) => (book.id === bookId)).length > 0) {
      return 'read'
    }
    return 'none'
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                className="close-search"
                to='/'>
                  Add a book
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => (this.updateQuery(event.target.value))} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.searchBooks.map(
                    (book) => (
                      <li key={book.id}>
                        <Book book={book} moveCallback={this.move.bind(this)} shelf={book.shelf || this.getBookShelf(book.id)} />
                      </li>
                    )
                  )
                }
              </ol>
            </div>
          </div>
      )}/>
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf key='currentlyReading' title="Current Reading" shelfId="currentlyReading" books={this.state.currentlyReading} moveCallback={this.move.bind(this)} />
              <Shelf key='wantToRead' title="Want to Read" shelfId="wantToRead" books={this.state.wantToRead} moveCallback={this.move.bind(this)} />
              <Shelf key='read' title="Read" shelfId="read" books={this.state.read} moveCallback={this.move.bind(this)} />
            </div>
          </div>
          <div className="open-search">
            <Link
              to='/search'>
                Add a book
            </Link>
          </div>
        </div>
      )}/>

      </div>
    )
  }
}

export default BooksApp

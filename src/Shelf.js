import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Shelf extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    this.retrieve()
  }
  retrieve = () => {
    BooksAPI.getAll().then(
      (books) => {
        this.setState(() => ({
          books: books.filter((book) => (book.shelf === this.props.shelfId)),
        }))
      }
    )
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf

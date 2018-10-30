import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  moveTo(shelf) {
    BooksAPI.update(this.props.book, shelf).then(
      // this.props.parentUpdate()
    )
  }
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => {this.moveTo(e.target.value)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors.map((author) => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book

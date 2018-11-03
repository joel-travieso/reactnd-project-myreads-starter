import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  moveTo(destinationShelf) {
    BooksAPI.update(this.props.book, destinationShelf).then(
      this.props.moveCallback(this.props.book.id, this.props.shelf || 'none', destinationShelf)
    )
  }
  render() {
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => {this.moveTo(e.target.value)}} value={this.props.shelf || 'none'}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors && this.props.book.authors.map((author) => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
    )
  }
}

export default Book

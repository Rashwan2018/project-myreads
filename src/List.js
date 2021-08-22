import React, { Component } from 'react'
import BookItem from './BookItem'
import SortBy from 'sort-by'
import PropTypes from 'prop-types'

class List extends Component {
  static propTypes = {
    changingShelf: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
  }

  render() {
    const shelves = ['read', 'currentlyReading', 'wantToRead'];
    const shelfTitle = ['Read', 'Currently Reading', 'Want to Read'];
    const { shelfBooks } = this.props;
    return (
      <div className='list-books-content'>

        {shelves.map((shelf, index) => (
          <div key={index} className='bookshelf'>
            <div className='bookshelf-title'>
              <h2 className=''>{shelfTitle[index]}</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {shelfBooks.sort(SortBy('title')).filter((book) => book.shelf === shelf).map(book => (

                      <li key={book.id}>

                        <BookItem changingShelf={this.props.changingShelf} book={book} />
                      </li>

                    )
                    
                    )}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  };
}

export default List;
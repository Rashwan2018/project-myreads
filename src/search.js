import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'
import SortBy from 'sort-by'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends Component {
    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        changingShelf: PropTypes.func.isRequired
    }
    state = {
        searchedBooks: [],
        query: ''
    }
    updateQuery = (event) => {
        this.setState({query: event.target.value});
        this.handleChange(event.target.value);
    }
    handleChange = (query) => {
        if (query.length <= 0) {
          this.setState({query: '', searchedBooks: []})
        } else {
          BooksAPI.search(query).then((searchedBooks) => {
            if (searchedBooks.error) {
              searchedBooks = []
            }
            const shelfBooks = this.props.shelfBooks;
            searchedBooks.map(book => shelfBooks.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf))
            this.setState({searchedBooks})
          })
        }
      }
    render() {
        return(
            <div>
                <div className='search-books-bar'>
                <Link className='close-search' to='/'>Close</Link>
                <div className='search-books-input-wrapper'>
                    <input
                            type='text'
                            value={this.state.query}
                            placeholder='Search For Your Book Here'
                            onChange={this.updateQuery}
                        />
                </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        <div className='bookshelf-books'>
                        <ol className='books-grid'>
                            {this.state.searchedBooks.sort(SortBy('title'))
                            .map(book => (
                                <BookItem 
                                changingShelf={this.props.changingShelf}
                                key={book.id}
                                book={book}
                                />
                            ))
                            }
                        </ol>
                        </div>
                    </ol>
                    </div>
                </div> 
        );
    }





}
export default Search;
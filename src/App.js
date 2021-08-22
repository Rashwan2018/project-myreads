import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import List from './List'
import {Route, Link} from 'react-router-dom'
import Search from './search'

class App extends React.Component {
  state={
    books: [],
  }
  
  updateShelfState = (book, shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      book.shelf= shelf;
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }));
    });
  }
  
    
      componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })

    }

  render() {
    return(
      <div>
        <Route exact path='/' render={() => ( 
          <div className='shelves-list'>
             <h1 className='list-books-title'>My Reads</h1>
            <List shelfBooks={this.state.books} changingShelf={this.updateShelfState}/>
            <div className='open-search'>
              <Link to='/search'><button>Add A Book</button></Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <Search shelfBooks={this.state.books} changingShelf = {this.updateShelfState}/>
        )}/>
      </div>
    );
  };
}
export default App;

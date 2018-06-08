import uuid from 'uuid';
import axios from 'axios';
//search for book and pull in API data
//save books searched for to reading list on bookPage
//make book review
//edit review
//delete book review
//delete book from saved list

export const fetchBooksFromDb = ()=> dispatch => {
    fetch('/api/books', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        }
    })
        .then(res=>res.json())
        .then(response=> {
            return dispatch(showBooks())
            console.log('Ran fetchBooksFromDb');
        })
        .catch(err=>console.log(err));
};

export const SHOW_BOOKS = 'SHOW_BOOKS';
export const showBooks = () => ({
    type: SHOW_BOOKS
});

export const getBookData = (searchTerm)=> dispatch => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyD04XQFraQwKU0LAmzOW--oI8Li24IooRw`)
        .then((response) => response.json())
        .then((books) => {
            console.log('Book items from getBookData fetchcall', books.items);
            let booksArray = [];
            books.items.map(book=> {
                let bookItem = {
                    title: book.volumeInfo.title,
                    price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
                    author: book.volumeInfo.authors && book.volumeInfo.authors.length>0 ? book.volumeInfo.authors.join(', ') : 'None',
                    desc:book.volumeInfo.description,
                    pageCount:book.volumeInfo.pageCount,
                    avgRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating found',
                    thumbnail: book.volumeInfo.imageLinks.thumbnail
                }
                booksArray.push(bookItem);
            })
            dispatch(getBookDataSuccess(booksArray));
            console.log('booksArray inside getBookData: ',booksArray);
        })
//     axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyD04XQFraQwKU0LAmzOW--oI8Li24IooRw`)
//         .then(response=> {
//             return response.data;
//         })
//         .then(data=> {
//             console.log(data.items);
//             let booksArray = [];
//             data.items.map(book=> {
//                 let bookItem = {
//                     title: book.volumeInfo.title,
//                     price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null,
//                     author: book.volumeInfo.authors.length>0 ? book.volumeInfo.authors.join(', ') : 'None',
//                     desc:book.volumeInfo.description,
//                     pageCount:book.volumeInfo.pageCount,
//                     avgRating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'No rating found',
//                     thumbnail: book.volumeInfo.imageLinks.thumbnail
//                 }
//                 booksArray.push(bookItem);
//             })
//             dispatch(getBookDataSuccess(booksArray));
//             // console.log(booksArray);
//         })
//         //dispatch getBookDataError(err), if err, show <p>Error, otherwise empty ''
//         .catch(err=>console.log(err));
// }
}

export const ADD_BOOK = 'ADD_BOOK';
export const addBook = (
    {
        title='',
        author='',
        price = 0,
        avgRating = 0
    } = {}
) => ({
    type: ADD_BOOK,
    book: {
        id: uuid(),
        title,
        author,
        price,
        avgRating
    }
});

export const GET_BOOK_DATA_SUCCESS = 'GET_BOOK_DATA_SUCCESS';
export const getBookDataSuccess = (books)=> ({
    type: GET_BOOK_DATA_SUCCESS,
    books
});

export const saveBookToDb = (book, history)=> dispatch=> {
    // console.log('token...');
    // console.log(localStorage.getItem('token'));
    fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //saved jwtToken to include 'Bearer' at the front
            'Authorization': `${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(book)
    })
        .then(res=>res.json())
        .then(response=> {
            console.log('saveBookToDb response is', response)
            dispatch(saveBook(response))
            history.push('/dashboard')
            console.log('Saved book to DB');
        })
        .catch(err=>console.log(err));
}

// if(req.body.title) bookFields.title = req.body.title;
//     if(req.body.author) bookFields.author = req.body.author;
//     if(req.body.price) bookFields.price = req.body.price;
//     if(req.body.rating) bookFields.rating = req.body.rating;
//     if(req.body.image) bookFields.image = req.body.image;
//     if(req.body.review) bookFields.review = req.body.review;

export const SAVE_BOOK = 'SAVE_BOOK';
export const saveBook = (book) => ({
    type: SAVE_BOOK,
    book
});


export const REMOVE_BOOK = 'REMOVE_BOOK';
export const removeBook = ({id}={})=> ({
    type: REMOVE_BOOK,
    id    
});

//**************************************************************** */
//BOOK REVIEW/COMMENTS ACTIONS

export const MAKE_BOOK_REVIEW = 'MAKE_BOOK_REVIEW';
export const makeBookReview = (text)=> ({
    type: MAKE_BOOK_REVIEW,
    text
});

export const DELETE_BOOK_REVIEW =  'DELETE_BOOK_REVIEW';
export const deleteBookReview = ({id}={})=> ({
    type: DELETE_BOOK_REVIEW,
    id    
});

export const EDIT_BOOK_REVIEW = 'EDIT_BOOK_REVIEW';
export const editBookReview = (id, updates)=> ({
    type: EDIT_BOOK_REVIEW,
    id,
    updates
});


import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {makeBookReview } from '../actions/books';

class AddReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            review: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            review: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const bookReview = {
            review: this.state.review
        }
        this.props.makeBookReview(bookReview, this.props.match.params.book_id, this.props.history);
    }


  render() {
      const {errors} = this.props;

    return (
        <div>
            <form className="review-form" onSubmit={this.onSubmit}>
            <h1 className="review-title">Add a Book Review</h1>
            {errors.review && <p className="error-msg">{JSON.stringify(errors.review)}</p>}
                <textarea 
                    placeholder="Add your review"
                    value={this.state.review}
                    onChange = {this.onChange}
                />
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    books: state.books,
    errors: state.errors
});


export default connect(mapStateToProps, {makeBookReview})(withRouter(AddReview));
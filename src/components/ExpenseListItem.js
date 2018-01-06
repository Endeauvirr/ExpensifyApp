import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ConfirmModal from './ConfirmModal';
import formatPrice from '../utils/formatPrice';
import { Link } from 'react-router-dom';
import { startRemoveExpense } from '../actions/expenses';


export class ExpenseListItem extends React.Component {
  state = {
    modalIsOpen: false
  }
  openModal = () => {
    this.setState(() => ({
      modalIsOpen: true
    }));
  }
  handleCloseModal = () => {
    this.setState(() => ({
      modalIsOpen: false
    }));
  }
  handleConfirmModal = (id) => {
    if (typeof id === 'undefined') {
      throw new Error('ID is not defined for removal action');
    }

    this.props.dispatch(startRemoveExpense(id));
  }
  render() {
    return (
      <div className="expenses__list-item">
        <div className="expense-item__description--wrapper">
          <h3 className="expense-item__header">
            <Link to={`/edit/${this.props.id}`}>
              {this.props.description}
            </Link>
            <p className="expense-item__date">Added at: {moment(this.props.createdAt).format('DD.MM.YYYY')}</p>
          </h3>
          <p className="expense-item__note">{this.props.note}</p>

        </div>

        <div className="expense-item__value">
          <span>{formatPrice(this.props.amount)}</span>
        </div>

        <div className="expense-item__action">
          <button
            type="button"
            onClick={this.openModal}
          >
            Remove
          </button>
        </div>
        <ConfirmModal 
          isOpen={this.state.modalIsOpen}
          handleCloseModal={this.handleCloseModal}
          handleConfirmModal={this.handleConfirmModal}
          {...this.props}
        />
      </div>
    );
  }
}

export default connect()(ExpenseListItem);

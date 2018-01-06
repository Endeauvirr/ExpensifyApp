import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = (props) => {
  Modal.setAppElement('body');

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.handleCloseModal}
      key={props.id}
      className="modal-confirm"
    >
      <section className="modal__wrapper">
        <header className="modal-header__wrapper">
          <h3 className="modal-header__title">
            Confirm removing expense
          </h3>
        </header>
        <div className="modal-body__wrapper">
          <p>You want to remove <span>{props.description}</span></p>
          <p>Are you sure you want to remove this expense?</p>
        </div>
        <footer className="modal-footer__wrapper">
          <button
            className="modal-footer__cancel-button"
            onClick={props.handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="modal-footer__confirm-button"
            onClick={() => {
              props.handleConfirmModal(props.id);
            }}
          >
            Confirm
          </button>
        </footer>
      </section>
    </Modal>
  );
};

export default ConfirmModal;

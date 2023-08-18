import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Input from './../../Input';
import Button from '../../Button/component';

const ModalEdit = ({children, isOpen, onClick, editData, size, fullscreen}) => {
  return (
    <Modal centered isOpen={isOpen} toggle={onClick} size={size} fullscreen={fullscreen} >
        <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
            <div className="form">
              {children}
            </div>
            <div style={{marginTop: 20, display: 'flex', gap: 8}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={onClick} />
                <Button label="Edit" type="success" width="100%" onClick={editData} />
            </div>
        </ModalBody>
    </Modal>
  )
}

export default ModalEdit;
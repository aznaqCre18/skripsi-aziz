import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Button from '../../Button/component';

const ModalCreate = ({children, isOpen, onClick, createData, size, isAlign, customLabelBtnOK}) => {
  return (
    <Modal centered isOpen={isOpen} toggle={onClick} size={size ? size : 'xl'} >
        <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
            <div className="form">
              {children}
            </div>
            <div style={{marginTop: 40, display: 'flex', gap: 8, flexDirection: isAlign ? 'row' : 'column-reverse'}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={onClick} />
                <Button label={customLabelBtnOK ? customLabelBtnOK : 'Simpan'} type="success" width="100%" onClick={createData} />
            </div>
        </ModalBody>
    </Modal>
  )
}

export default ModalCreate;
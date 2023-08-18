import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Button from '../../Button/component';

const ModalPrint = ({children, isOpen, onClick, printData, size, isAlign}) => {
  return (
    <Modal centered isOpen={isOpen} toggle={onClick} size={size ? size : 'xl'} >
        <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
            <div className="form" style={{display: 'flex', justifyContent: 'center'}}>
              {children}
            </div>
            <div style={{marginTop: 40, display: 'flex', gap: 8, flexDirection: isAlign ? 'row' : 'column-reverse'}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={onClick} />
                <Button label="Cetak" type="success" width="100%" onClick={printData} />
            </div>
        </ModalBody>
    </Modal>
  )
}

export default ModalPrint;
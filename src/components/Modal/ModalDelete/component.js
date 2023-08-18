import React from 'react'
import { Modal, ModalBody } from 'reactstrap';
import Button from '../../Button/component';

export default function ModalDelete({children, isOpen, onClick, deleteData, size, isAlign}) {
  return (
    <Modal centered isOpen={isOpen} toggle={onClick} size={size ? size : 'xl'} >
        <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
            <div className="form">
              {children}
            </div>
            <div style={{marginTop: 40, display: 'flex', gap: 8, flexDirection: isAlign ? 'row' : 'column-reverse'}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={onClick} />
                <Button label="Hapus" type="success" width="100%" onClick={deleteData} />
            </div>
        </ModalBody>
    </Modal>
  )
}

import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Input from './../../Input';
import Button from '../../Button/component';

const ModalEditData = ({isOpen, onClick, onDeleteData}) => {
  return (
    <Modal centered isOpen={isOpen} toggle={onClick} >
        <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
            <p style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28, textAlign: 'center'}} >Anda yakin akan menghapus data ini?</p>
            <div style={{marginTop: 20, display: 'flex', gap: 8}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={() => onClick('delete')} />
                <Button label="Hapus" type="success" width="100%" onClick={onDeleteData} />
            </div>
        </ModalBody>
    </Modal>
  )
}

export default ModalEditData;
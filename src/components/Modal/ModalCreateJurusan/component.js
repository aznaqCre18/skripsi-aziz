import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import Input from './../../Input';
import Button from '../../Button/component';

const ModalCreateJurusan = ({isOpen, onClick, addDataJurusan, onChangeInput}) => {
  return (
    <Modal centered isOpen={isOpen} toggle={onClick} >
        <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
            <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Buat Jurusan</h4>
            <Input label="Kode Jurusan" name="kodeJurusan" placeholder="Masukan kode jurusan" onChange={onChangeInput} />
            <Input label="Nama Jurusan" name="namaJurusan" placeholder="Nama jurusan" onChange={onChangeInput} />
            <div style={{marginTop: 20, display: 'flex', gap: 8}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={onClick} />
                <Button label="Buat" type="success" width="100%" onClick={addDataJurusan} />
            </div>
        </ModalBody>
    </Modal>
  )
}

export default ModalCreateJurusan;
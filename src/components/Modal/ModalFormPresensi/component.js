import React from 'react'
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import RadioButton from '../../RadioButton';
import ModalCreate from '../ModalCreate';

const dataDropdownAbsen  = [
  {name: "Hadir", value: "hadir"},
  {name: "Izin", value: "izin"},
  {name: "Sakit", value: "sakit"},
  {name: "Alpa", value: "alpa"},
]

const ModalFormPresensi = ({isShow, onHide, data, type = "edit", onChangeSelect, idPertemuan, onSubmitAbsen, dataAbsensi, editAbsensi, dataMapelDetail, actions, actionsSiswa, inputValueAbsensi}) => {
  const [dataEdit, setDataEdit] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdownAbsen, setSelectedDropdownAbsen] = useState("");
  const [valueDropdownAbsen, setValueDropdownAbsen] = useState("");

  const _handleOpenModalEditAbsen = (item,) => {
    setDataEdit(item);
    setIsOpen(!isOpen);
  }

  const _handleChangeDropdownAbsen = (item) => {
    setSelectedDropdownAbsen(item.name);
    setValueDropdownAbsen(item.value);
  }

  const _handleEditAbsensi = () => {
    const payloadTemp = {
      id: dataEdit.id,
      status: valueDropdownAbsen,
    }

    editAbsensi(payloadTemp);
    
    setIsOpen(false);
    setSelectedDropdownAbsen("");
  }

  console.log(dataMapelDetail);

  return (
    <Modal
      fullscreen
      toggle={onHide}
      isOpen={isShow}
      className="modal-custom-contianer"
    >
      <ModalBody className="modal-body-custom-container">
        <div className="title-section" style={{marginBottom: 32}}>
          <p 
            className="mapel-kelas"
            style={{
              fontSize: 24,
              fontFamily: 'Quicksand',
              fontWeight: 'bold'
            }}
          >
            {`${dataMapelDetail.mapel.namaMapel} - ${dataMapelDetail.kelas.kodeKelas}`}
          </p>
          <p 
            className="guru"
            style={{
              fontWeight: '300'
            }}
          >
            Luciana Zogbi, S.Pd.
          </p>
        </div>

        <div className="list-siswa">
          {
            data && data.length > 0 ? (
              <table style={{width: "100%"}}>
                <tbody>
                  <tr style={{backgroundColor: '#F5F6F8', height: 52}}>
                    <th style={{padding: "0 32px"}}>NO.</th>
                    <th>NAMA</th>
                    <th>PRESENSI</th>
                    {type === "edit" && <th>ACTION</th>}
                  </tr>
                  {
                    data && data.length > 0 ? data.map((item, idx) => {
                      return (
                        <tr key={idx} style={{height: 52}}>
                          <td style={{padding: "0 32px"}} >{idx + 1}</td>
                          <td width={900}>{item.nama}</td>
                          <td>
                            {
                              type === 'edit' ? dataAbsensi.length > 0 && idx < dataAbsensi.length ? (
                                <p style={{textTransform: 'uppercase'}} >{dataAbsensi[idx].status}</p>
                              ) : (
                                <div className="checkbox" style={{display: 'flex'}}>
                                  <RadioButton label="Hadir" idx={idx} value="hadir" data={item} dataMapel={dataMapelDetail} onCheckStatus={onChangeSelect} idPertemuan={idPertemuan} />
                                  <RadioButton label="Izin" idx={idx} value="izin" data={item} dataMapel={dataMapelDetail} onCheckStatus={onChangeSelect} idPertemuan={idPertemuan} />
                                  <RadioButton label="Sakit" idx={idx} value="sakit" data={item} dataMapel={dataMapelDetail} onCheckStatus={onChangeSelect} idPertemuan={idPertemuan} />
                                  <RadioButton label="Alpa" idx={idx} value="alpa" data={item} dataMapel={dataMapelDetail} onCheckStatus={onChangeSelect} idPertemuan={idPertemuan} />
                                </div>
                              ) : (
                                <div style={{textTransform: 'capitalize'}} className="label-tag">{item.status}</div>
                              )
                            }
                          </td>
                          {type === "edit" && <td><button disabled={dataAbsensi.length > 0 && idx < dataAbsensi.length ? false : true} onClick={() => _handleOpenModalEditAbsen({item, status: dataAbsensi.length > 0 && idx < dataAbsensi.length && dataAbsensi[idx].status, id: dataAbsensi.length > 0 && idx < dataAbsensi.length && dataAbsensi[idx].id})} style={{fontSize: 14, padding: "6px 12px", borderRadius: 4, border: 'none', backgroundColor: dataAbsensi.length > 0 && idx < dataAbsensi.length ? '#FFB72B' : '#BFBFBF', color: '#fff', cursor: dataAbsensi.length > 0 && idx < dataAbsensi.length ? 'pointer' : 'not-allowed'}} >Edit</button></td>}
                        </tr>
                      )
                    }) : null
                  }
                </tbody>
              </table>
            ) : (
              <p style={{display: 'flex', justifyContent: 'center'}} >Belum ada data absen untuk pertemuan ini</p>
            )
          }
        </div>
        <ModalCreate size="m" isOpen={isOpen} isAlign onClick={_handleOpenModalEditAbsen} createData={_handleEditAbsensi}  >
          <h4 style={{marginBottom: 20}}>Edit Absensi</h4>
          <div style={{marginBottom: 20}} className="info">
            <div className="name" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
              <p>Nama</p>
              <p style={{fontWeight: '500'}} >{dataEdit?.item?.nama}</p>
            </div>
            <div className="kelas" style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Kelas</p>
              <p style={{fontWeight: '500'}} >{dataEdit?.item?.kelas?.namaKelas}</p>
            </div>
          </div>

          <Dropdown data={dataDropdownAbsen} value={selectedDropdownAbsen === "" ? dataEdit?.status : selectedDropdownAbsen} onChange={_handleChangeDropdownAbsen} />
        </ModalCreate>
      </ModalBody>
      <ModalFooter>
      <Button label={type === 'see' ? 'Tutup' : 'Batal'} type="danger" onClick={onHide} /> 
      { type !== 'see' &&
        <Button
          label="Simpan"
          type="success"
          onClick={onSubmitAbsen}
          disable={inputValueAbsensi.length < 1}
          color={inputValueAbsensi.length < 1 ? "#BFBFBF" : null}
        />
      }
      </ModalFooter>
    </Modal>
  )
}

export default ModalFormPresensi
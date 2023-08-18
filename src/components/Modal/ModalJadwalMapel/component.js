import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../../Button';
import Dropdown from '../../Dropdown';

const hari = [
    { name: "Senin", value: "senin"},
    { name: "Selasa", value: "selasa"},
    { name: "Rabu", value: "rabu"},
    { name: "Kamis", value: "kamis"},
    { name: "Jum'at", value: "jum'at"},
];

const ModalJadwalMapel = ({isShow, onHide, data, type, dataDropdownMapel, dataDropdownGuru, dataDropdownKelas, waktuMenagajar, handleCreateJadwal, dataBeforeEdit, changeDropdownHari, valueDropdownHari, valueDropdownKelas, changeDropdownKelas, changeDropdownMapel, defaultValuDropdownMultiple}) => {
  const [editTemp, setEditTemp] = useState(null);

  useEffect(() => {
      console.log(defaultValuDropdownMultiple, 'ahay');
      let theRight = defaultValuDropdownMultiple?.mapel?.sort((a, b) => Number(a.jam) - Number(b.jam));

      console.log(theRight, "VARR");

      setEditTemp(theRight);
  }, [defaultValuDropdownMultiple])
    
  
  const _handleCreateJadwal = () => {
    let payload = [];

    Object.keys(defaultValuDropdownMultiple).map(function(key, index) {
      payload = [
        ...payload,
        {
          hari: valueDropdownHari,
          idKelas: valueDropdownKelas.defaultValuDropdownIdKelas,
          idMapel: defaultValuDropdownMultiple[key] && defaultValuDropdownMultiple[key].mapel ? defaultValuDropdownMultiple[key].mapel.id : '',
          idGuru: defaultValuDropdownMultiple[key] && defaultValuDropdownMultiple[key].guru ? defaultValuDropdownMultiple[key].guru.id : '',
          idWaktuMengajar: defaultValuDropdownMultiple[key] && defaultValuDropdownMultiple[key].idWaktuMengajar ? defaultValuDropdownMultiple[key].idWaktuMengajar : '',
          idTahunAjaran: 1
        }
      ]
    });

    handleCreateJadwal(payload);
  }

  const _handleEditJadwal = () => {
    console.log(defaultValuDropdownMultiple, "DATAAA");
    console.log('edit');
  }


  return (
    <Modal
      fullscreen
      toggle={onHide}
      isOpen={isShow}
      className="modal-custom-contianer"
    >
      <ModalBody className="modal-body-custom-container" style={{padding: 40}} >
        <div className="title-section" style={{marginBottom: 32}}>
          <p 
            className="mapel-kelas"
            style={{
              fontSize: 24,
              fontFamily: 'Quicksand',
              fontWeight: 'bold'
            }}
          >
            Isi Jadwal Pelajaran
          </p>
          <p 
            className="guru"
            style={{
              fontWeight: '300'
            }}
          >
            Administrasi Jadwal Pelajaran
          </p>
        </div>

        <div className="list-siswa">
            <div className="buat-jadwal">
                <div className="hari" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}} >
                    <p style={{width: 700}}>Hari</p>
                    <p style={{marginRight: 40}}>:</p>
                    {
                      type !== 'edit' ? (
                        <p style={{width: '100%'}}><Dropdown data={hari} value={valueDropdownHari} onChange={changeDropdownHari} /></p>
                      ):(
                        <p style={{width: '100%'}}><Dropdown data={hari} value={defaultValuDropdownMultiple && defaultValuDropdownMultiple?.hari} onChange={changeDropdownHari} /></p>
                      ) 
                    }
                </div>
                <div className="kelas" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}} >
                    <p style={{width: 700}}>Kelas</p>
                    <p style={{marginRight: 40}}>:</p>
                    <p style={{width: '100%'}}><Dropdown data={dataDropdownKelas} nameKey="namaKelas" value={valueDropdownKelas.defaultValuDropdownKelas} onChange={changeDropdownKelas} /></p>
                </div>
                {
                  waktuMenagajar && waktuMenagajar.map((data, idx) => {
                    return (
                      <div key={idx} className="kelas" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}} >
                        <div style={{width: 700, display: 'flex', justifyContent: 'space-between'}}>
                          <p>Jam ke <b>{data.jamMapel}</b></p>
                          <p style={{marginRight: 40, fontWeight: 'bold'}} >{data.waktuMapel}</p>
                        </div>
                        <p style={{marginRight: 40}}>:</p>
                        {
                          type !== 'edit' ? (
                            <div style={{width: '100%', display: 'flex', gap: 16}}>
                              <Dropdown keyForm={{keyForm: data.jamMapel, typeDr: 'mapel', idWaktuMengajar: data.id}} value={defaultValuDropdownMultiple && defaultValuDropdownMultiple[data.jamMapel] && defaultValuDropdownMultiple[data.jamMapel].mapel  ? defaultValuDropdownMultiple[data.jamMapel].mapel.namaMapel : '-- Pilih Mapel --'} data={dataDropdownMapel} nameKey="namaMapel" onChange={changeDropdownMapel} />
                              <Dropdown keyForm={{keyForm: data.jamMapel, typeDr: 'guru', idWaktuMengajar: data.id}} value={defaultValuDropdownMultiple && defaultValuDropdownMultiple[data.jamMapel] && defaultValuDropdownMultiple[data.jamMapel].guru  ? defaultValuDropdownMultiple[data.jamMapel].guru.nama : '-- Pilih Guru --'} data={dataDropdownGuru} nameKey="nama" onChange={changeDropdownMapel} />
                            </div>
                          ) : (
                            <div style={{width: '100%', display: 'flex', gap: 16}}>
                              <Dropdown keyForm={{keyForm: data.jamMapel, typeDr: 'mapel', idWaktuMengajar: data.id}} value={editTemp && editTemp[idx]?.mataPelajaran} data={dataDropdownMapel} nameKey="namaMapel" onChange={changeDropdownMapel} />
                              <Dropdown keyForm={{keyForm: data.jamMapel, typeDr: 'guru', idWaktuMengajar: data.id}} value={editTemp && editTemp[idx]?.guru} data={dataDropdownGuru} nameKey="nama" onChange={changeDropdownMapel} />
                            </div>
                          )
                        }
                      </div>
                    )
                  })
                }
            </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <Button label="Cancel" type="danger" onClick={onHide} /> 
      <Button
        label="Simpan"
        type="success"
        onClick={type === 'edit' ? _handleEditJadwal : _handleCreateJadwal}
      />
      </ModalFooter>
    </Modal>
  )
}

export default ModalJadwalMapel;
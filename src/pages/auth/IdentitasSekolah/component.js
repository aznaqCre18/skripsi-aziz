import React, { Component } from 'react';
import Button from '../../../components/Button';
import Header from '../../../components/Header/component';
import Input from '../../../components/Input';
import Loading from '../../../components/Loading/component';
import ModalCreate from '../../../components/Modal/ModalCreate/component';
import ModalEdit from '../../../components/Modal/ModalEditData';
import AuthService from '../../../utils/authService';
import { JadwalPelajaranImage } from './../../../configs/images';

const Auth = new AuthService();

export default class IdentitasSekolah extends Component {
  state = {
    isLoading: true,
    idEdit: '',
    dataInput: {
      npsn: "",
      nama: "",
      kepalaSekolah: "",
      bendahara: "",
      noTelp: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      kodePos: "",
      alamat: "",
    },

    //modal
    isModalCreate: false,
    isModalEdit: false,
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.getIdentitasSekolah(2);

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 1000);
  }

  _handleOpenModalCreate = () => {
    this.setState({
      isModalCreate: !this.state.isModalCreate
    })
  }

  _handleOpenModalEdit = (data) => {
    this.setState({
      isModalEdit: !this.state.isModalEdit,
      idEdit: data.id,
      dataInput: {
        npsn: data.npsn,
        nama: data.nama,
        kepalaSekolah: data.kepalaSekolah,
        bendahara: data.bendahara,
        noTelp: data.noTelp,
        kota: data.kota,
        kecamatan: data.kecamatan,
        kelurahan: data.kelurahan,
        kodePos: data.kodePos,
        alamat: data.alamat,
      }
    })
  }

  _handleChangeInput = (e) => {
    this.setState({
      dataInput: {
        ...this.state.dataInput,
        [e.target.name]: e.target.value,
      }
    })
  }

  _handleCreateData = () => {
    console.log(this.state.dataInput);
  }

  _handleEditData= () => {
    const { idEdit, dataInput } = this.state;
    const { actions } = this.props;

    actions.editIdentitasSekolah(idEdit, dataInput);

    setTimeout(() => {
      actions.getIdentitasSekolah(idEdit);
    }, 500);

    this.setState({
      isModalEdit: false
    })
  }

  render() {
    const { isLoading, isModalCreate, dataInput, isModalEdit } = this.state;
    const { dataIdentitas } = this.props;
    
    return (
      isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="header-dashboard" style={{marginBottom: 32}}>
            <Header 
              title="Identitas Sekolah"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>
          {
            dataIdentitas ? (
              <div style={{backgroundColor: '#fff', borderRadius: 16, gap: 32, padding: '28px 28px'}} className="container-identitas-sekolah">
                <Button color="#FFB72B" label="Update Identitas Sekolah" data={dataIdentitas} onClick={() => this._handleOpenModalEdit(dataIdentitas)} />
                <div className="info-wrapper-identitas" style={{display: 'flex', gap: 120, marginTop: 28}} >
                  <div className="left-side">
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>NPSN</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.npsn}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Nama Sekolah</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.nama}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Kepala Sekolah</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.kepalaSekolah}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Bendahara</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.bendahara}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Nomor Telepon</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.noTelp}</p>
                    </div>
                  </div>
                  <div className="right-side">
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Alamat</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.alamat}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Kabupaten/Kota</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.kota}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Kelurahan</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.kelurahan}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Kecamatan</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.kecamatan}</p>
                    </div>
                    <div style={{marginBottom: 16}} className="field-identity">
                      <p><b style={{fontFamily: 'Quicksand'}}>Kode POS</b></p>
                      <p style={{fontFamily: 'Quicksand', textTransform: 'capitalize'}}>{dataIdentitas.kodePos}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{backgroundColor: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 653, gap: 32}} className="container-identitas-sekolah">
                <img src={JadwalPelajaranImage} alt="empty" />
                <div className="wording">
                  <h3>Identitas sekolah belum diisi !</h3>
                  <p>Yuk isi dulu dengan mengklik</p>
                  <p style={{marginBottom: 16}}>tombol dibawah ini</p>
                  <Button label="Buat Identitas Sekolah" onClick={this._handleOpenModalCreate} />
                </div>
              </div>   
            )
          }
          <ModalCreate isOpen={isModalCreate} onClick={this._handleOpenModalCreate} createData={this._handleCreateData} >
            <h5 style={{marginBottom: 28}}>Buat Identitas Sekolah</h5>
            <div className="form-container-identitas" style={{display: 'flex', width: 'auto', gap: 20}}>
              <div className="left" style={{width: '100%'}}>
                <Input label="NPSN" name="npsn" placeholder="masukan npsn sekolah..." onChange={this._handleChangeInput} />
                <Input label="Nama Sekolah" name="nama" placeholder="masukan nama sekolah..." onChange={this._handleChangeInput} />
                <Input label="Kepala Sekolah" name="kepalaSekolah" placeholder="nama kepala sekolah..." onChange={this._handleChangeInput} />
                <Input label="Bendahara" name="bendahara" placeholder="nama bendahara sekolah..." onChange={this._handleChangeInput} />
                <Input label="Nomor Telepon" name="noTelp" placeholder="masukan no telepon sekolah..." onChange={this._handleChangeInput} />
              </div>
              <div className="right" style={{width: '100%'}}>
                <Input label="Kabupaten/Kota" name="kota" placeholder="masukan nama kota..." onChange={this._handleChangeInput} />
                <Input label="Kecamatan" name="kecamatan" placeholder="masukan nama kecamatan..." onChange={this._handleChangeInput} />
                <Input label="Kelurahan" name="kelurahan" placeholder="masukan nama kelurahan..." onChange={this._handleChangeInput} />
                <Input label="Kode POS" name="pos" placeholder="masukan kode pos sekolah..." onChange={this._handleChangeInput} />
                <Input label="Alamat Lengkap" name="alamat" placeholder="masukan alamat sekolah..." onChange={this._handleChangeInput} />
              </div>
            </div>
          </ModalCreate>

          <ModalEdit isOpen={isModalEdit} onClick={this._handleOpenModalEdit} size="lg" editData={this._handleEditData} >
            <h5 style={{marginBottom: 28}}>Ubah Identitas Sekolah</h5>
            <div className="form-container-identitas" style={{display: 'flex', width: 'auto', gap: 20}}>
              <div className="left" style={{width: '100%'}}>
                <Input label="NPSN" name="npsn" placeholder="masukan npsn sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.npsn} />
                <Input label="Nama Sekolah" name="nama" placeholder="masukan nama sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.nama} />
                <Input label="Kepala Sekolah" name="kepalaSekolah" placeholder="nama kepala sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.kepalaSekolah} />
                <Input label="Bendahara" name="bendahara" placeholder="nama bendahara sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.bendahara} />
                <Input label="Nomor Telepon" name="noTelp" placeholder="masukan no telepon sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.noTelp} />
              </div>
              <div className="right" style={{width: '100%'}}>
                <Input label="Kabupaten/Kota" name="kota" placeholder="masukan nama kota..." onChange={this._handleChangeInput} defaultValue={dataInput.kota} />
                <Input label="Kecamatan" name="kecamatan" placeholder="masukan nama kecamatan..." onChange={this._handleChangeInput} defaultValue={dataInput.kecamatan} />
                <Input label="Kelurahan" name="kelurahan" placeholder="masukan nama kelurahan..." onChange={this._handleChangeInput} defaultValue={dataInput.kelurahan} />
                <Input label="Kode POS" name="pos" placeholder="masukan kode pos sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.kodePos} />
                <Input label="Alamat Lengkap" name="alamat" placeholder="masukan alamat sekolah..." onChange={this._handleChangeInput} defaultValue={dataInput.alamat} />
              </div>
            </div>
          </ModalEdit>
        </React.Fragment>
      )
    )
  }
}

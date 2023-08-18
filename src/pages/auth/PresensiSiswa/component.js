import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import moment from 'moment';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { EditBgIcon, EditIcon, EyeBgIcon } from '../../../configs/icons';
import ModalFormPresensi from '../../../components/Modal/ModalFormPresensi';
import SelectDateRangePicker from '../../../components/SelectDateRangePicker';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'pertemuan', fieldApi: 'pertemuan'},
  {fieldName: 'tanggal', fieldApi: 'tanggal', type: 'date'},
  {fieldName: 'action', fieldApi: ''},
];

const dataTableDummy = [
  {
    pertemuan: 'Pertemuan 1',
    tanggal: '18 April 2021',
  },
  {
    pertemuan: 'Pertemuan 2',
    tanggal: '25 April 2021',
  },
  {
    pertemuan: 'Pertemuan 3',
    tanggal: '01 Mei 2021',
  },
  {
    pertemuan: 'Pertemuan 4',
    tanggal: '08 Mei 2021',
  },
]

const buttonGroup = [
  { label: 'Tambah data pertemuan', value: 'add-data'},
]

const customIconAction = [
  { icon: EyeBgIcon, value: 'see' }, 
  { icon: EditBgIcon, value: 'edit' },
]

const dummyDataAbsen = [
  {name: 'Aziz Nur Abdul Qodir'},
  {name: 'Dyah Puji Astuti'},
  {name: 'Ridwansyah Oktavianto'},
  {name: 'Annisa Lutfiani'},
]

export default class PresensiSiswa extends Component {
  state = {
    isLoading: true,
    isModalCreatePresens: false,
    isModalFormPresens: false,
    typeModalPresens: '',
    idPertemuan: '',
    inputValue: {
      idJadwalMapel: "",
      idMapel: "",
      idTahunAjaran: JSON.parse(Auth.getTahunAjaran()).id,
      pertemuan: "",
      tanggal: ""
    },
    inputValueAbsen: [],
  }

  componentDidMount() {
    const { actions, actionsSiswa } = this.props;
    const { dataJadwalMapel } = this.props.location.state;

    actions.getPertemuanByIdJadwal(dataJadwalMapel.id);
    // actions.getDataAbsensiByIdPertemuan(dataJadwalMapel.id);
    actionsSiswa.getDataSiswaByIdKelas(dataJadwalMapel.kelas.id);

    setTimeout(() => {
      this.setState({isLoading: false, inputValue: { ...this.state.inputValue, idMapel: dataJadwalMapel.mapel.id }})
    }, 2000)
  }

  _handleClickButtonHeader = (value) => {
    if(value === 'add-data') {
      this.setState({
        isModalFormPresens: false,
        isModalCreatePresens: !this.state.isModalCreatePresens
      })
    } else if(value === 'form-presense') {
      this.setState({
        isModalFormPresens: !this.state.isModalFormPresens,
        isModalCreatePresens: false
      })
    }
  }

  _handleActionButton = (value, dataApi) => {
    const { actions } = this.props;

    if(value === 'edit' ) {
      this._handleClickButtonHeader('form-presense');
      this.setState({ typeModalPresens: value, idPertemuan: dataApi.id });
      actions.getDataAbsensiByIdPertemuan(dataApi.id);
    } else if(value === 'see') {
      actions.getDataAbsensiByIdPertemuan(dataApi.id);
      this._handleClickButtonHeader('form-presense');
      this.setState({ typeModalPresens: value });
    }
  }

  _handleChangeCalendar = (data) => {
    console.log(data);
    this.setState({
      inputValue: {
        ...this.state.inputValue,
        tanggal: data,
      }
    })
  }

  _handleChangeInput = (e) => {
    const { dataJadwalMapel } = this.props.location.state;

    this.setState({
      inputValue: {
        ...this.state.inputValue,
        idJadwalMapel: dataJadwalMapel.id,
        [e.target.name]: e.target.value,
      }
    })
  }

  _handleCreatePertemuan = () => {
    const { inputValue } = this.state;
    const { actions } = this.props;

    actions.addPertemuanByIdJadwal(inputValue);

    setTimeout(() => {
      actions.getPertemuanByIdJadwal(inputValue.idJadwalMapel);
      this.setState({
        isModalCreatePresens: false
      })
    }, 500);
  }

  _handleChangeSelectAbsensi = (data) => {
    const { inputValueAbsen } = this.state;
    let arrTemp = inputValueAbsen;

    if(inputValueAbsen.length < 1) {
      console.log('masuk pertama');
      arrTemp.push(data);
    } else {
      for (let i = 0; i < arrTemp.length; i++) {
        const findSome = arrTemp.findIndex((dataFind) => {
          if (dataFind.idSiswa === data.idSiswa) {
            return true;
          } else {
            return false;
          }
        });

        if(findSome !== -1) {
          console.log('ada idSiswa yg sama', data.status, i);
          arrTemp[findSome] = {
            ...arrTemp[findSome],
            status: data.status,
            idMapel: data.idMapel,
          }

          break;
        } else if(findSome === -1) {
          console.log('gak ada idSiswa yg sama');
          arrTemp = [
            ...arrTemp,
            data
          ];
          break;
        }
      }
    }

    this.setState({ inputValueAbsen: arrTemp });
  }

  _handleSubmitAbsen = async () => {
    const { inputValueAbsen } = this.state;
    const { actions } = this.props;

    await actions.addAbsensiSiswa(inputValueAbsen);

    this.setState({
      isModalFormPresens: false,
      inputValueAbsen: []
    })
  }

  _handleEditAbsensi = (payload) => {
    const { idPertemuan } = this.state;
    const { actions, actionsSiswa } = this.props;

    actions.editAbsensiSiswa(payload);

    setTimeout(() => {
      const { dataJadwalMapel } = this.props.location.state;

      actions.getPertemuanByIdJadwal(dataJadwalMapel.id);
      actions.getDataAbsensiByIdPertemuan(idPertemuan);
      actionsSiswa.getDataSiswaByIdKelas(dataJadwalMapel.kelas.id);
      
    }, 500);

    this.setState({ typeModalPresens: "edit" });
  }
  
  render() {
    const { isLoading, isModalCreatePresens, isModalFormPresens, typeModalPresens, idPertemuan, inputValueAbsen } = this.state;
    const { dataPertemuan, dataSiswa, dataAbsensi, actions, actionsSiswa } = this.props;
    const { dataJadwalMapel } = this.props.location.state;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Daftar Pertemuan"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 32}}>
              <div className="info-mapel">
                <p className="mapel" style={{fontWeight: '600', fontFamily: 'Quicksand', fontSize: 22}}>{dataJadwalMapel.mapel.namaMapel}</p>
                <p className="guru" style={{fontSize: 14, fontWeight: '300'}}>{dataJadwalMapel.guru.nama}</p>
              </div>
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} isSearchField={false} />
            </div>
            <div className="table-section">
              <Table datasets={dataPertemuan} tableField={fieldTable} customIconAction={customIconAction} onClickAction={this._handleActionButton} />
            </div>
          </div>

          <Modal centered isOpen={isModalCreatePresens} toggle={() => this._handleClickButtonHeader('add-data')} >
            <ModalBody style={{padding: '2rem'}} className="modal-body-custom">
              <h4 style={{fontFamily: 'Quicksand', fontWeight: 'Bold', marginBottom: 28}} >Buat Presensi</h4>
              <Input label="Pertemuan ke" placeholder="Cth. Pertemuan 8" name="pertemuan" onChange={this._handleChangeInput} />
              <SelectDateRangePicker onChange={this._handleChangeCalendar} title="Masukan tanggal hari ini" />
              <div style={{marginTop: 20, display: 'flex', gap: 8}} className="btn-group-cust">
                <Button label="Batal" type="danger" width="100%" onClick={() => this._handleClickButtonHeader('add-data')} />
                <Button label="Buat" type="success" width="100%" onClick={this._handleCreatePertemuan} />
              </div>
            </ModalBody>
          </Modal>

          <ModalFormPresensi inputValueAbsensi={inputValueAbsen} actions={actions} actionsSiswa={actionsSiswa} dataMapelDetail={dataJadwalMapel} editAbsensi={this._handleEditAbsensi} dataAbsensi={dataAbsensi} idPertemuan={idPertemuan} isShow={isModalFormPresens} onHide={() => this._handleClickButtonHeader('form-presense')} data={typeModalPresens === "edit" ? dataSiswa : dataAbsensi} type={typeModalPresens} onChangeSelect={this._handleChangeSelectAbsensi} onSubmitAbsen={this._handleSubmitAbsen} />
        </div>
      )
    )
  }
}

import React, { Component } from 'react';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import MainDataView from '../../../layout/MainDataView/component';
import AuthService from '../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../configs/icons';
import { LogoImage } from '../../../configs/images';
import ModalCreate from '../../../components/Modal/ModalCreate/component';
import Input from '../../../components/Input';
import ModalDeleteData from '../../../components/Modal/ModalDeleteData';
import ModalEdit from '../../../components/Modal/ModalEditData/component';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import downloadToPdf from '../../../utils/downloadToPdf';
import Dropdown from '../../../components/Dropdown';
import Button from './../../../components/Button';
import qs from 'query-string';
import 'moment/locale/id';

const Auth = new AuthService();

const fieldTabel = [
  {
    fieldName: 'no.',
    fieldApi: ''
  },
  {
    fieldName: 'nama lengkap',
    fieldApi: 'nama'
  },
  {
    fieldName: 'kelas',
    fieldApi: 'kelas'
  },
  {
    fieldName: 'nama mapel',
    fieldApi: 'mapel'
  },
  {
    fieldName: 'kategori',
    fieldApi: 'kategori'
  },
  {
    fieldName: 'nilai',
    fieldApi: 'nilai'
  },
  {
    fieldName: '',
    fieldApi: ''
  },
];
const dataApi = [
  {
    nama: "Mn Irfansyah",
    kelas: "XII - TSM",
    mapel: "Ilmu Pengetahuan Alam",
    uh1: "80",
    uh2: "90",
    uts: "85",
    uas: "90",
  }
];

const customIconAction = [
  { icon: EditIcon, value: 'edit' }, 
  { icon: DeleteIcon, value: 'delete' },
]

const dataDropdownKatNilai = [
  {name: "Ulangan Harian 1", value: "uh1"},
  {name: "Ulangan Harian 2", value: "uh2"},
  {name: "Ujian Tengah Semester", value: "uts"},
  {name: "Ujian Akhir Semester", value: "uas"},
]

export default class NilaiSiswa extends Component {
  state = {
    isLoading: true,

    isModalCreate: false,
    isModalEdit: false,
    isModalDelete: false,
    idEdit: '',
    idDelete: '',
    selectedCatNilai: '-- Kategori --',
    selectedCatKelas: '-- Kelas --',
    selectedCatMapel: '-- Pelajaran --',
    payloadGetNilai: {
      idKelas: '',
      idMapel: '',
      kategori: '',
    },
  }

  componentDidMount() {
    const { actionsKelas, actionsPelajaran } = this.props;

    actionsKelas.getDataKelas();
    actionsPelajaran.getDataMapel();

    this._setLoading();
  }

  _setLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      console.log('edit');
    } else if(type === 'delete') {
      console.log('delete');
    }
  }

  _handleSelectDropdownKelas = (data) => {
    const { history } = this.props;
    const { location } = history;
    const queryParams = qs.parse(location.search);

    const newQueryParams = {
      ...queryParams,
      idKelas: data.id,
      namaKelas: data.namaKelas,
    };

    history.push({
      search: qs.stringify(newQueryParams)
    });
  }
  
  _handleSelectDropdownPelajaran = (data) => {
    const { history } = this.props;
    const { location } = history;
    const queryParams = qs.parse(location.search);

    const newQueryParams = {
      ...queryParams,
      idMapel: data.id,
      namaMapel: data.namaMapel
    };

    history.push({
      search: qs.stringify(newQueryParams)
    });
  }
  
  _handleSelectDropdownKategori = (data) => {
    const { history } = this.props;
    const { location } = history;
    const queryParams = qs.parse(location.search);

    const newQueryParams = {
      ...queryParams,
      kategori: data.value,
      selectedCat: data.name
    };

    history.push({
      search: qs.stringify(newQueryParams)
    });
  }

  _handleTampilNilai = () => {
    const { actionsNilai, actionsSiswa, history } = this.props;
    const payload = qs.parse(history.location.search);
    const idSiswa = JSON.parse(Auth.getProfile()).id;

    actionsNilai.getDataNilaiByIdSiswa(idSiswa, payload.idMapel, payload.kategori);
    // actionsSiswa.getDataSiswaByIdKelas(payload.idKelas);
  }

  _handleClickButtonHeader = () => {
    const { dataSiswa, dataNilaiAdmin } = this.props;

    let dataExportPDF = [];
    const attr = ['No.', 'Nama Lengkap', 'Kelas', 'Nama Mapel', 'Guru', 'Kategori', 'Nilai'];
    const title = "Data Laporan Nilai Siswa";
    const fileName = "data-laporan-siswa";

    dataSiswa.map((x, idx) => {
      let tempRow = [];
      tempRow.push(idx + 1);
      tempRow.push(x.nama ? x.nama : '-');
      tempRow.push(x.kelas.kodeKelas ? x.kelas.kodeKelas : '-');
      tempRow.push(idx < dataNilaiAdmin.length && dataNilaiAdmin[idx].idSiswa === x.id ? dataNilaiAdmin[idx].mapel.namaMapel : '-');
      tempRow.push(idx < dataNilaiAdmin.length && dataNilaiAdmin[idx].idSiswa === x.id ? dataNilaiAdmin[idx]?.mapel?.jadwal_mapel[0]?.guru?.nama : '-');
      tempRow.push(idx < dataNilaiAdmin.length && dataNilaiAdmin[idx].idSiswa === x.id ? dataNilaiAdmin[idx].kategori : '-');
      tempRow.push(idx < dataNilaiAdmin.length && dataNilaiAdmin[idx].idSiswa === x.id ? dataNilaiAdmin[idx].nilai : '-');

      dataExportPDF.push(tempRow);
    });

    const thnAjar = `${dataNilaiAdmin[0].tahunAjaran.thnAjaran}`;
    const kelas = `${dataNilaiAdmin[0].kelas.kodeKelas}`;

    moment.locale('id');
    const dateNow = moment(Date.now());
    const dateNew = dateNow.format("LL");

    downloadToPdf(dataExportPDF, attr, title, fileName, thnAjar, kelas, dateNew);
  }

  _handleSetCategory = (cat) => {
    let category;

    if(cat === "uh1") {
      category = 'Ulangan Harian 1'
    } else if(cat === "uh2") {
      category = 'Ulangan Harian 2'
    } else if(cat === "uts") {
      category = 'Ujian Tengah Semester'
    } else if(cat === "uas") {
      category = 'Ujian Akhir Semester'
    }

    return category;
  }

  render() {
    const { isLoading } = this.state;
    const { dataSiswa, dataKelas, dataMapel, history, dataNilaiAdmin, dataNilaiSiswa } = this.props;
    const searchParams = qs.parse(history.location.search)

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Nilai Siswa"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView isSearchField={false}>
                <div className="filter-wrapper" style={{display: 'flex', justifyContent: 'space-between', width: '100%'}} >
                  <div className="dropdown-group" style={{display: 'flex', gap: 24}} >
                    <Dropdown nameKey="namaMapel" data={dataMapel} value={searchParams.namaMapel ? searchParams.namaMapel : "-- Pelajaran --"} width={264} onChange={this._handleSelectDropdownPelajaran} />
                    <Button label="Tampilkan nilai" onClick={this._handleTampilNilai} />
                  </div>
                </div>
              </HeaderMainDataView>
            </div>
            <div className="table-section-nilai">
              <table>
                <tr className='row-head'>
                  <th>NO.</th>
                  <th>Mata Pelajaran</th>
                  <th>Kategori</th>
                  <th>Nilai</th>
                </tr>
                {
                  dataNilaiSiswa?.length > 0 && dataNilaiSiswa.map((data, idx) => {
                    console.log(dataNilaiSiswa, "SISWAA DENGER");
                    return (
                      <tr>
                        <td>{idx+1}</td>
                        <td>{data.mapel.namaMapel}</td>
                        <td>{this._handleSetCategory(data.kategori)}</td>
                        <td>{data.nilai}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
            <div className="table-section-nilai" style={ dataNilaiSiswa?.length > 0 ? {display: 'none'} : {display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160}}>
              <p style={{fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: 18, marginTop: -20}} >Filter terlebih dahulu !</p>
            </div>
          </div>
        </div>
      )
    )
  }
}

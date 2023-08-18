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
import { KopImage } from '../../../configs/images';

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

export default class AbsenSiswaAdmin extends Component {
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
    const { actionsKelas, actionsPelajaran, actionsAbsen } = this.props;

    actionsKelas.getDataKelas();
    actionsPelajaran.getDataMapel();
    // actionsAbsen.getAllPertemuan();

    this._setLoading();
  }

  _setLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000);
  }

  _onClickActionButton = (type, dataApi) => {
    if(type === 'edit') {
      console.log('edit');
    } else if(type === 'delete') {
      console.log('delete');
    }
  }

  _handleSelectDropdownPertemuan = (data) => {
    const { history } = this.props;
    const { location } = history;
    const queryParams = qs.parse(location.search);

    const newQueryParams = {
      ...queryParams,
      idPertemuan: data.id,
      pertemuan: data.pertemuan,
    };

    history.push({
      search: qs.stringify(newQueryParams)
    });
  }
  
  _handleSelectDropdownPelajaran = (data) => {
    const { history, actionsAbsen } = this.props;
    const { location } = history;
    const queryParams = qs.parse(location.search);

    actionsAbsen.getAllPertemuanByIdMapel(data.id);

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

  _handleTampilAbsen = () => {
    const { history, actionsAbsen } = this.props;
    const payload = qs.parse(history.location.search);

    actionsAbsen.getAllAbsensi(payload);
  }

  _handleClickButtonHeader = () => {
    const { dataAbsensiAll, dataNilaiAdmin } = this.props;

    let dataExportPDF = [];
    const attr = ['No.', 'NIS', 'Nama Lengkap', 'Pengajar', 'Mata Pelajaran', 'Tanggal', 'Status'];
    const title = "Data Laporan Absensi Siswa";
    const fileName = "data-laporan-absensi-siswa";

    dataAbsensiAll.map((data, idx) => {
      let tempRow = [];
      tempRow.push(idx + 1);
      tempRow.push(data?.siswa?.nis);
      tempRow.push(data?.siswa?.nama);
      tempRow.push(data?.pertemuan?.jadwalMapel?.guru?.nama);
      tempRow.push(data?.mapel?.namaMapel);
      tempRow.push(data?.pertemuan?.tanggal);
      tempRow.push(data?.status);

      dataExportPDF.push(tempRow);
    });

    const thnAjar = `${dataAbsensiAll[0].pertemuan?.jadwalMapel?.tahunAjaran?.thnAjaran}`
    const semester = `${dataAbsensiAll[0]?.pertemuan?.jadwalMapel?.tahunAjaran?.semester}`;
    const kelas = `${dataNilaiAdmin[0].kelas.kodeKelas}`;

    moment.locale('id');
    const dateNow = moment(Date.now());
    const dateNew = dateNow.format("LL");

    let name = fileName + ' ' + moment().format('DD-MM-yyyy');
    const doc = new jsPDF('potrait');

    doc.autoTable({
      head: [attr],
      body: dataExportPDF,
      headStyles: {
          fontSize: 10,
          fillColor: [255, 255, 255],
          textColor: 0
      },
      styles: {
          lineColor: [234, 234, 234]
      },
      bodyStyles: {
          fillColor: [255, 255, 255]
      },
      alternateRowStyles: {
          fillColor: [255, 255, 255]
      },
      
      didDrawPage: function(data) {
          doc.addImage(KopImage, 'PNG', 12, 5, 200, 35);
          doc.setFontSize(11);
          doc.setFont('Calibri');
          doc.setLineWidth(0.8);
          doc.line(0, 50, 300, 50);
          doc.text(`Absensi Tanggal  :  ${dataAbsensiAll[0]?.pertemuan?.tanggal}`, 14, 60);
          doc.text(`Kelas  :  ${kelas}`, 14, 66);
          doc.text(`Tahun Ajaran  :  ${thnAjar} - ${semester.toUpperCase()}`, 14, 72);
          doc.text(`Depok, ${dateNew}`, 150, 240);
          doc.text(`Trihadi Sulaksono, ST. M.M`, 150, 270);
          doc.setFont('Calibri', 'bold');
          doc.text(`Kepala Sekolah`, 150, 275);
          doc.setFontSize(10);
      },
      margin: { top: 80, right: 12, left: 12, bottom: 5 }
    });
    
    doc.save(name + '.pdf');
  }

  render() {
    const { isLoading } = this.state;
    const { dataMapel, history, dataPertemuanIdMapel, dataAbsensiAll } = this.props;
    const searchParams = qs.parse(history.location.search);
    console.log(dataAbsensiAll, "<< ABSEN ALL");

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Absensi Siswa"
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
                    {dataPertemuanIdMapel.length > 0 && <Dropdown nameKey="pertemuan" data={dataPertemuanIdMapel} value={searchParams.pertemuan ? searchParams.pertemuan : "-- Pertemuan --"} width={264} onChange={this._handleSelectDropdownPertemuan} />}
                    <Button label="Tampilkan data absensi" onClick={this._handleTampilAbsen} disable={searchParams.idPertemuan ? false : true} color={searchParams.idPertemuan ? "#34BE82" : "#BFBFBF"} />
                  </div>
                  <div className="btn-export">
                    <Button label="Import data absensi" onClick={this._handleClickButtonHeader} />
                  </div>
                </div>
              </HeaderMainDataView>
            </div>
            <div className="table-section-nilai">
              <table>
                <tr className='row-head'>
                  <th>NO.</th>
                  <th>NIS</th>
                  <th>Nama Lengkap</th>
                  <th>Pengajar</th>
                  <th>Mata Pelajaran</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                </tr>
                {
                  dataAbsensiAll.length > 0 && dataAbsensiAll.map((data, idx) => {
                    return (
                      <tr>
                        <td>{idx+1}</td>
                        <td>{data?.siswa?.nis}</td>
                        <td>{data?.siswa?.nama}</td>
                        <td>{data?.pertemuan?.jadwalMapel?.guru?.nama}</td>
                        <td>{data?.mapel?.namaMapel}</td>
                        <td>{data?.pertemuan?.tanggal}</td>
                        <td style={{textTransform: 'uppercase'}}>{data?.status}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
            <div className="table-section-nilai" style={ dataAbsensiAll.length > 0 ? {display: 'none'} : {display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160}}>
              <p style={{fontFamily: 'Quicksand', fontWeight: 'bold', fontSize: 18, marginTop: -20}} >Filter terlebih dahulu !</p>
            </div>
          </div>
        </div>
      )
    )
  }
}

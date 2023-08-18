import React, { Component } from 'react';

import AuthService from '../../../utils/authService';
import Loading from '../../../components/Loading/component';
import Table from '../../../components/Table';
import Header from '../../../components/Header/component';
import HeaderMainDataView from '../../../components/HeaderMainDataView';

const Auth = new AuthService();

const fieldTable = [
  {fieldName: 'no.', fieldApi: ''},
  {fieldName: 'tahun ajaran', fieldApi: 'tahunAjaran'},
  {fieldName: 'semester', fieldApi: 'semester'},
];

const dataTableDummy = [
  {
    tahunAjaran: '2020/2021',
    semester: 'Ganjil',
  },
  {
    tahunAjaran: '2020/2021',
    semester: 'Genap',
  },
  {
    tahunAjaran: '2021/2022',
    semester: 'Ganjil',
  },
  {
    tahunAjaran: '2021/2022',
    semester: 'Genap',
  },
]

const buttonGroup = [
  { label: 'Tambah Tahun Ajaran', value: 'add-data'},
]

export default class TahunAjaran extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000)
  }

  _handleClickButtonHeader = (value) => {
    console.log(value);
  }
  
  render() {
    const { isLoading } = this.state;
    return (
      isLoading ? (
        <Loading />
      ) : (
        <div className="main-view-container">
          <div className="header-dashboard">
            <Header 
              title="Tahun Ajaran"
              fullName={JSON.parse(Auth.getProfile()).nama}
              role={Auth.getUserType()}
            />
          </div>

          <div className="main-content-view">
            <div className="header-tools">
              <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} isSearchField={false} />
            </div>
            <div className="table-section">
              <Table datasets={dataTableDummy} tableField={fieldTable} />
            </div>
          </div>
        </div>
      )
    )
  }
}

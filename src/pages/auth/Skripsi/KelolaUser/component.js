import React, { Component } from 'react';
import Loading from '../../../../components/Loading/component';
import Table from '../../../../components/Table';
import Header from '../../../../components/Header';
import HeaderMainDataView from '../../../../components/HeaderMainDataView';
import AuthService from '../../../../utils/authService';
import { EditIcon, DeleteIcon } from '../../../../configs/icons';
import ModalCreate from '../../../../components/Modal/ModalCreate/component';
import { ADD_DATA_BTN, DELETE_DATA_BTN, EDIT_DATA_BTN, EXPORT_DATA_BTN } from '../../../../constants/buttonType';
import Input from '../../../../components/Input/component';
import ModalEdit from '../../../../components/Modal/ModalEditData/component';
import ModalDelete from '../../../../components/Modal/ModalDelete/component';

const Auth = new AuthService();

const fieldTabel = [
  {
    fieldName: 'NO.',
    fieldApi: ''
  },
  {
    fieldName: 'ID USER',
    fieldApi: 'id'
  },
  {
    fieldName: 'nama lengkap',
    fieldApi: 'name'
  },
  {
    fieldName: 'username',
    fieldApi: 'username'
  },
  {
    fieldName: 'action',
    fieldApi: ''
  },
];

const buttonGroup = [
    { label: 'Tambah data user', value: ADD_DATA_BTN},
]

const customIconAction = [
    {value: EDIT_DATA_BTN, icon: EditIcon},
    {value: DELETE_DATA_BTN, icon: DeleteIcon}
  ]

export default class KelolaUser extends Component {
    state = {
        isLoading: true,
        isOpenCreate: false,
        isOpenEdit: false,
        isOpenDelete: false,
        formUser: {
          id: '',
          name: '',
          username: '',
          password: '',
        },
    }

    componentDidMount() {
        const { actions } = this.props;

        actions.getDataUsers();
        this._setLoading();
    }

    _setLoading = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 500);
    }

    _handleClickButtonHeader = (value) => {
      if (value === ADD_DATA_BTN) {
        this._handleOpenModalCreate();
      }
    }

    _handleClickBtnAction = async (type, dataApi) => {
      if (type === EDIT_DATA_BTN) {
        this.setState({
          isOpenEdit: true,
          formUser: {
            id: dataApi.id,
            name: dataApi.name,
            username: dataApi.username,
          }
        });
      } else if (type === DELETE_DATA_BTN) {
        this.setState({
          isOpenDelete: true,
          formUser: {
            id: dataApi.id,
            name: dataApi.name,
            username: dataApi.username,
          }
        });
      }
    }

    _handleChangeCreateEdit = (e) => {
      const { name, value } = e.target;
      const { formUser } = this.state;

      this.setState({
        formUser: {
          ...formUser,
          [name]: value
        }
      })
    }

    // CREATE ACTION

    _handleOpenModalCreate = () => {
      this.setState({
        isOpenCreate: !this.state.isOpenCreate,
        formUser: {
          id: '',
          name: '',
          username: '',
          password: '',
        },
      });
    }

    _handleCreateUser = () => {
      const { formUser } = this.state;
      const { actions } = this.props;
      
      const payload = {
        name: formUser.name,
        username: formUser.username,
        password: formUser.password,
      }

      actions.createUser(payload, this._handleOpenModalCreate);

      setTimeout(() => {
        actions.getDataUsers();
      }, 500);
    }


    // EDIT ACTION

    _handleOpenModalEdit = async (value, dataClick) => { 
      this.setState({ isOpenEdit: !this.state.isOpenEdit });
    }

    _handleEditUser = async () => {
      const { formUser } = this.state;
      const { actions } = this.props;

      actions.editDataUsersById(formUser, this._handleOpenModalEdit);

      setTimeout(() => {
        actions.getDataUsers();
      }, 500);
    }

    // DELETE ACTION

    _handleOpenModalDelete = () => {
      this.setState({ isOpenDelete: !this.state.isOpenDelete });
    }

    _handleDeleteUser = () => {
      const { formUser } = this.state;
      const { actions } = this.props;

      actions.deleteDataUsersById(formUser);
      setTimeout(() => {
        this._handleOpenModalDelete();
        actions.getDataUsers();
      }, 500);
    }

    render() {
        const { isLoading, isOpenCreate, isOpenEdit, isOpenDelete, formUser } = this.state;
        const { dataUsers } = this.props;
        return (
            isLoading ? (
                <Loading />
            ) : (
                <div className="main-view-container">
                  <div className="header-dashboard">
                      <Header 
                        title="Kelola User"
                        fullName={JSON.parse(Auth.getProfile()).name}
                      />
                  </div>
          
                  <div className="main-content-view">
                      <div className="header-tools">
                      <HeaderMainDataView button={buttonGroup} onClick={this._handleClickButtonHeader} />
                      </div>
                      <div className="table-section">
                      <Table 
                        datasets={dataUsers} 
                        tableField={fieldTabel} 
                        customIconAction={customIconAction} 
                        onClickAction={this._handleClickBtnAction} 
                      />
                      </div>
                  </div>

                  <ModalCreate 
                    isOpen={isOpenCreate}
                    onClick={this._handleOpenModalCreate}
                    createData={this._handleCreateUser}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Tambah Data User</h4>
                    <div className="main-form">
                      <Input 
                        label="Nama"
                        name="name"
                        placeholder="Masukan nama"
                        onChange={this._handleChangeCreateEdit}
                      />
                      <Input 
                        label="Username"
                        name="username"
                        placeholder="Masukan username"
                        onChange={this._handleChangeCreateEdit}
                      />
                      <Input 
                        label="Password"
                        name="password"
                        placeholder="Masukan password"
                        type="password"
                        onChange={this._handleChangeCreateEdit}
                      />
                    </div>
                  </ModalCreate>

                  <ModalEdit 
                    isOpen={isOpenEdit}
                    onClick={this._handleOpenModalEdit}
                    editData={this._handleEditUser}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Edit Data User</h4>
                    <div className="main-form">
                      <Input 
                        label="Nama"
                        name="name"
                        placeholder="Masukan nama"
                        defaultValue={formUser.name}
                        onChange={this._handleChangeCreateEdit}
                      />
                      <Input 
                        label="Username"
                        name="username"
                        placeholder="Masukan username"
                        defaultValue={formUser.username}
                        onChange={this._handleChangeCreateEdit}
                      />
                    </div>
                  </ModalEdit>

                  <ModalDelete
                    isOpen={isOpenDelete}
                    onClick={this._handleOpenModalDelete}
                    deleteData={this._handleDeleteUser}
                    size="md"
                    isAlign
                  >
                    <h4 style={{ marginBottom: 20 }}>Hapus Data User</h4>
                    <p>Anda yakin akan menghapus user ini? Klik hapus jika iya</p>
                  </ModalDelete>
                </div>
            )
        )
    }
}

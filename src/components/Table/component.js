import React from 'react'
import { DeleteIcon, EditIcon } from '../../configs/icons';
import moment from 'moment';
import IntToRupiah from '../../utils/IntToRupiah';

function Table({tableField, datasets, type, title, customIconAction, onClickAction}) {

  const renderTableDynamic = (datasets, tableField) => {
    let tdWithApi = [];
    
    for (let i = 0; i < tableField.length; i++) {
      if(tableField[i].fieldApi !== "") {
        tdWithApi.push(tableField[i])
      }
    }

    const renderDynamic = (data) => {
      return (
        tdWithApi.map((item, index) => {
          if (item.type === 'date') {
            return (
              <td key={index}>{moment(data[item.fieldApi]).format('dddd, DD MMM YYYY')}</td>
            )
          } else if (item.type === 'rupiah') {
            return (
              <td key={index}>{IntToRupiah(data[item.fieldApi])}</td>
              )
            } else if (item.render) {
              return (
                <td key={index}><item.render item={data[item.fieldApi]} /></td>
              )
          } else {
            return (
              <td key={index}>{data[item.fieldApi]}</td>
            )
          }
        })
      )
    }

    return (
      datasets.map((dataApi, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          {renderDynamic(dataApi)}
          {
            type !== 'jadwal-mengajar' && (
              <td>
                <div className="btn-action">
                  {
                    customIconAction && customIconAction.map((data, idx) => {
                      return (
                        <div className="btn-act">
                          <img src={data && data.icon} onClick={() => onClickAction(data.value, dataApi)} alt={`btn-action-${idx}`} />
                        </div>
                      )
                    })
                  }
                </div>
              </td>
            )
          }
        </tr>
      ))
    )
  }

  return (
    <div className="table-container">
      {
        datasets.length > 0 ? (
          <table cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr className="row-head" >
                {
                  tableField.map((data, index) => (
                    <th key={index}>{data.fieldName}</th>
                  ))
                }
              </tr>
              {renderTableDynamic(datasets, tableField)}
            </tbody>
          </table>
        ) : (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: '-40px'}} >
            Data masih kosong
          </div>
        )
      }
    </div>
  )
}

export default Table
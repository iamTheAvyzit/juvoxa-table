import React from 'react'
import { useTable, useColumnOrder, useSortBy, usePagination, useBlockLayout, useResizeColumns } from 'react-table'
import './table.css'

export const ReusableTable = ({data, col}) => {
  
  const defaultColumn = React.useMemo(                                                                                                     //creating a default style for columns; useMemo will cache these value
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400
    }),
    []
  )

  const { getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          setColumnOrder,
          visibleColumns,
          resetResizing,
          prepareRow,
          page,                                                                                                                            //An array of rows for the current page, determined by the current pageIndex value.
          nextPage,
          previousPage,
          canPreviousPage,                                                                                                                 //if there are pages to render then returns true ; current pageIndex > 0
          canNextPage,
          pageOptions,                                                                                                                     //array that corresponds to available pages to render; in this case we use it to display the length of pages
          state: { pageIndex, pageSize },
        } = useTable({ columns: col, data: data, initialState: { pageIndex: 0 }, defaultColumn }, 
            useColumnOrder, 
            useSortBy, 
            usePagination, useBlockLayout, useResizeColumns)

  function shuffle(arr) {                                                                                                                  //here shuffle is the updater function which recieves [name, ticker, asset_class...]
    arr = [...arr]
    const shuffled = []
    while (arr.length) {
      const rand = Math.floor(Math.random() * arr.length)
      shuffled.push(arr.splice(rand, 1)[0])                                                                                                //perfomrs splice at 'rand' index and adds it to the [0]th index of 'shuffled' array
    }
    return shuffled
  }

  const randomizeColumns = () => {
    setColumnOrder(shuffle(visibleColumns.map(d => d.id)))                                                                                 //recieves an updater function which returns an array of ids [name, ticker, asset_class...] based on the returned array, setColumnOrder will set the order
  }

  return ( 
    <div className='table-container'>
      <div className='bttn-container'>
        <button className='table-bttn' onClick={resetResizing}>Reset Resizing</button>
        <button className='table-bttn' onClick={() => randomizeColumns({})}>Reorder Column</button>                                      {/*onClick calls the randomizer func*/}
      </div>
      <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (                                                                                             //headerGroups is a flattened array of all the headers in the JSON
              <tr {...headerGroup.getHeaderGroupProps()}>                                                                                  {/*map through all the props in headerGroups and then through other props needed for this header group's row.*/}
                {headerGroup.headers.map(column => (                                                                                       //mapping through headers which contains the columns in this header group
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}                                                                                              {/*and for each column in the headers we render only the Header prop */}
                    <span>
                      {column.isSorted                                                                                                     //checking condition for sort status by using built-in col prop 'isSorted' which returns a boolean
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                    <div
                    {...column.getResizerProps()}                                                                                          //getResizerProps is a header prop which enables resizing for headers
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''                                                                                //isResizing is built-in prop which returns boolean based on conditions
                    }`}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>                                                                                                 {/*core table body prop needed to render other components*/}
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => { 
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )  
            })}
          </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'◀'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'▶'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </div>  
  )
}
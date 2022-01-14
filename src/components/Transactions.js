import { useEffect, useMemo, useState } from 'react'
import { getTransactions } from './FetchApi'
import { ReusableTable } from './ReusableTable'

function Transactions() {
    const [tranxnTable, setTranxnTable] = useState([])

    useEffect(() => {
        getTransactions().then((result) => {
            setTranxnTable(result.transactions)
        })
        .catch((err) => console.log(err.message))
      }, [])

      const INT_FORMATTER = new Intl.NumberFormat("en-us", {                                              // formatting floats in International US format (commas seperated: 1, 000, 00)
      
      })
    
      const transactionData = useMemo(() => [...tranxnTable], [tranxnTable])
      const str = ['name', 'ticketref', 'traded_on', 'quantity', 'currency', 'settlement_amount']
      const transactionCol = useMemo(() => tranxnTable[0] ? Object.keys(tranxnTable[0]).filter((key) => key==='name' | key==='ticketref' | key==='traded_on' | key==='quantity' | key==='currency' | key==='settlement_amount').map((key) => {
        switch(key) {
          case 'name': return { Header: 'Name', accessor: key }
          case 'ticketref': return { Header: 'Ticket Ref', accessor: key }
          case 'traded_on': return { Header: 'Trade Date', Cell: ({value}) => <>{value.split('-').join('/')}</>, accessor: key }
          case 'quantity': return { Header: 'QTY', Cell: ({value}) => { return (value!=null) ? INT_FORMATTER.format(parseFloat(value).toFixed(2)) : 'Non-disclosable' }, accessor: key }
          case 'currency': return { Header: 'CCY', accessor: key }
          case 'settlement_amount': return { Header: 'Settlement Amount', Cell: ({value}) => { return (value!=null) ? INT_FORMATTER.format(parseFloat(value).toFixed(2)) : 'Non-disclosable' }, accessor: key }
          default: return { Header: key, accessor: key }
        }
        })
        : [], [tranxnTable])
  
      return (
        <>
          <h1 style={{color: "white", "margin-top": "5%"}}>Transactions</h1>
          <ReusableTable data={transactionData} col={transactionCol}/>
        </>
      )
}

export default Transactions
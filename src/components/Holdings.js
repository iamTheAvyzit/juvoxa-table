import { useEffect, useMemo, useState } from 'react'
import { getHoldingsPayload } from './FetchApi'
import { ReusableTable } from './ReusableTable'

function Holdings() {
    const [holdingsTable, setHoldingsTable] = useState([])

    useEffect(() => {
      getHoldingsPayload().then((results) => {
        setHoldingsTable(results.payload)
        })
        .catch((err) => console.log(err.message))
    }, [])

    const INT_FORMATTER = new Intl.NumberFormat("en-us", {                                              // formatting the input and output in International US format (commas seperated: 1, 000, 00)
      
    })

    const holdingsData = useMemo(() => [...holdingsTable], [holdingsTable])

    const holdingsCol = useMemo(() => holdingsTable[0] ? Object.keys(holdingsTable[0]).map((key) => {
        switch(key) {
          case 'name': return { Header: 'Name', Cell: ({value}) => <span>{value.replace(/[0-9]|[%-.@/:]/g, ' ')}</span>, accessor: key }
          case 'ticker': return { Header: 'Ticker ', accessor: key }
          case 'asset_class': return { Header: 'Asset Class', accessor: key }
          case 'avg_price': return { Header: 'Avg. Price', Cell: ({value}) => { return (value!=null) ? (value!=null) ? INT_FORMATTER.format(parseFloat(value).toFixed(2)) : 'Non-disclosable' : 'Non-disclosable' }, accessor: key }
          case 'market_price': return { Header: 'Market Price', Cell: ({value}) => { return (value!=null) ? INT_FORMATTER.format(parseFloat(value).toFixed(2)) : 'Non-disclosable' }, accessor: key }
          case 'latest_chg_pct': return { Header: '% Change', accessor: key }
          case 'market_value_ccy': return { Header: 'Market Value', Cell: ({value}) => { return (value!=null) ? INT_FORMATTER.format(parseFloat(value).toFixed(2)) : 'Non-disclosable' }, accessor: key }
          default: return { Header: key, accessor: key }
        }
      })
      : [], [holdingsTable])

    return (
      <>
        <h1 style={{color: "white", "margin-top": "5%"}}>Holdings</h1>
        <ReusableTable data={holdingsData} col={holdingsCol}/>
      </>
    )
    
}

export default Holdings
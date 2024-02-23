import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
import SeatChart from './components/SeatChart'

// ABIs
import TokenMaster from './abis/TokenMaster.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const tokenMaster = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      TokenMaster,
      provider)

    const address = config[31337].TokenMaster.address

    //Refresh Account 
    window.ethereum.on('accountsChanges', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })



  }
  useEffect(() => {
    loadBlockchainData()
  }, [])


  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h2 className='header__title'><strong> Event </strong> Tickets </h2>
      </header>
      <h1>Hello World</h1>
      <p> {account} </p>
    </div>
  );
}

export default App;
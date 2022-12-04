import React from 'react';
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './App.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [currentNetwork, setCurrentNetwork] = useState("")

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
      console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
    }
    
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0])

    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );


  const renderNetworkPrompt = () => (
    alert("Hello there, This app is built on the rinkeby testnet and it looks like you are on a different ethereum network. Please switch to the Rinkeby testnet to continue")
  )


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Hello World</p>
        </div>
      </div>
    </div>
  );
}

export default App;
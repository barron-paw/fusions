import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export function useWallet() {
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  // BSC 主网配置
  const BSC_MAINNET = {
    chainId: '0x38', // 56 in decimal
    chainName: 'BNB Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/']
  }

  // BSC 测试网配置
  const BSC_TESTNET = {
    chainId: '0x61', // 97 in decimal
    chainName: 'BNB Smart Chain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/']
  }

  // 检查是否已连接钱包
  useEffect(() => {
    if (window.ethereum) {
      checkConnection()
      // 监听账户变化
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          await setupWallet(accounts[0])
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      setupWallet(accounts[0])
    }
  }

  const handleChainChanged = () => {
    window.location.reload()
  }

  const setupWallet = async (accountAddress) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      setProvider(provider)
      setSigner(signer)
      setAccount(accountAddress)
      setIsConnected(true)
    } catch (error) {
      console.error('Error setting up wallet:', error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('请安装 MetaMask 钱包！')
      window.open('https://metamask.io/', '_blank')
      return
    }

    try {
      // 请求连接账户
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        // 检查当前网络
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        
        // 如果不是 BSC 主网，提示切换
        if (chainId !== BSC_MAINNET.chainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: BSC_MAINNET.chainId }]
            })
          } catch (switchError) {
            // 如果切换失败，尝试添加网络
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [BSC_MAINNET]
              })
            } else {
              throw switchError
            }
          }
        }

        await setupWallet(accounts[0])
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      if (error.code === 4001) {
        alert('用户拒绝了连接请求')
      } else {
        alert('连接钱包失败: ' + error.message)
      }
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    setProvider(null)
    setSigner(null)
  }

  return {
    account,
    isConnected,
    provider,
    signer,
    connectWallet,
    disconnectWallet
  }
}


import Web3 from 'web3'

export default function getWeb3() {
    return new Promise(function(resolve, reject) {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        var results;
        var web3 = window.web3;
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider)
            results = {
                web3: web3
            }
            console.log('Injected web3 detected.');
            resolve(results)
        } else {
            // Fallback to localhost if no web3 injection.
            var provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/006a20906c5c42f5a009c20d63988dd7')
            web3 = new Web3(provider)
            results = {
                web3: web3
            }
            console.log('No web3 instance injected, using Local web3.');
            resolve(results)
        }
    })
}
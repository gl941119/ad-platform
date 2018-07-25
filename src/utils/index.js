// import Web3 from 'web3';

// export function mainNetContract(abi, address) {
// console.log('window.web3->', window.web3);
//     // let web3;
//     var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/006a20906c5c42f5a009c20d63988dd7"));
//      // if (typeof web3 !== 'undefined') {
//      //     console.log('test');
//      // } else {
//      //     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//      //     console.log('net-->');
//      //     web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/006a20906c5c42f5a009c20d63988dd7"));
//      // }

//     let customContract = web3.eth.contract(abi).at(address);
//     // console.log('custom instance ->',customContract);
//     let start = customContract.START();
//     let days = customContract.DAYS();
//     let raisedAmount = customContract.raisedAmount();
//     let cap = customContract.CAP();
//     let rate = customContract.RATE();
//     let minContribution = customContract.minContribution();
//     let maxContribution = customContract.maxContribution();
//     return {
//         startTime: start.toNumber(),
//         sustainDay: days.toNumber(),
//         raisedAmount: web3.fromWei(raisedAmount, 'ether').toNumber(),
//         total: cap.toNumber(),
//         rate: rate.toNumber(),
//         minContribution: web3.fromWei(minContribution, 'ether').toNumber(),
//         maxContribution: web3.fromWei(maxContribution, 'ether').toNumber(),
//     }
// }
















// let myWeb3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/006a20906c5c42f5a009c20d63988dd7"));
// console.log('hhah-,m->', myWeb3, myWeb3.currentProvider);

// var MyContract = myWeb3.eth.contract(abi);

// var myContractInstance = MyContract.at('0x8Eb5318E4C64e1fC885f4BC39b8FF7fCDE3E1069');

// let myName = myContractInstance.name();
// let mySymbol = myContractInstance.symbol();
// console.log('ADFFFFFFF->', myName, mySymbol);
// let total = myContractInstance.totalSupply();
// console.log('gggggggg->', total);
    // .then(result => {
    //     console.log('ADFFFFFFF->', result);
    // })

// wei是以太坊上的的最小单位，ether小数点后18位为一个wei
// var balanceWei = myWeb3.eth.getBalance("0xdad085eb10fefc2c2ddac7dc9d22c7dbf1a78480").toNumber();
// console.log('11111111111111111111,m->', myWeb3.eth.defaultBlock);
// console.log('hhah-23242354325,m->', balanceWei);
// // 从wei转换成ether
// var balance = myWeb3.fromWei(balanceWei, 'ether');
// console.log('hhah-121121221,m->', balance);

import getWeb3 from './getWeb3';
import contract from 'truffle-contract';
export class ContractCls {
    constructor(abi, address) {
        this.web3 = null;
        this.abi = abi;
        this.address = address;
    }

    // contract init -> contractInstance
    async init() {
        try {
            if (!this.web3) {
                let result = await getWeb3();
                this.web3 = result.web3;
            }
            let initContract = contract(this.abi);
            initContract.setProvider(this.web3.currentProvider);
            return initContract.at(this.address);
        } catch (error) {
            console.error('init web3 error_>', error);
            return new Error('init web3 error');
        }
    }
}

export function handleContract(detailData) {
    return new Promise((resolve, reject) => {
        let { ico_abi, ico_address } = detailData;
        // console.log('ico-contract-abi->', detailData);
        let instanceCls = new ContractCls(ico_abi, ico_address);
        let instance;
        instanceCls.init().then(res => {
            instance = res;
            Promise.all([instance.START(), instance.DAYS(), instance.raisedAmount(), instance.CAP(), instance.RATE(), instance.minContribution(), instance.maxContribution()]).then(res => {
                let [start, days, raisedAmount, cap, rate, minContribution, maxContribution] = res;
                resolve({
                    startTime: start.toNumber(),
                    sustainDay: days.toNumber(),
                    raisedAmount: instanceCls.web3.fromWei(raisedAmount, 'ether').toNumber(),
                    total: cap.toNumber(),
                    rate: rate.toNumber(),
                    minContribution: instanceCls.web3.fromWei(minContribution, 'ether').toNumber(),
                    maxContribution: instanceCls.web3.fromWei(maxContribution, 'ether').toNumber(),
                });
            })
        }).catch(e => {
            console.error('instance contract error', e);
            reject(e);
        })
    });
}
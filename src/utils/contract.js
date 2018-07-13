import getWeb3 from './getWeb3';
import contract from 'truffle-contract';
export default class ContractCls {
    constructor(abi, address) {
        this.web3 = null;
        this.abi = abi;
        this.address = address;

    }

    // contract init -> contractInstance
    async init() {
        try {
            if(!this.web3){
                let result = await getWeb3();
                this.web3 = result.web3;
            }
            let initContract = contract(this.abi);
            initContract.setProvider(this.web3.currentProvider);
            return initContract.at(this.address);
        } catch (error) {
            console.error('init web3 error_>', error);
            return null;
        }
    }
}
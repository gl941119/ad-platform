var BeringiaContract = artifacts.require("./BeringiaContract.sol");

module.exports = function(deployer) {
  deployer.deploy(BeringiaContract);
};
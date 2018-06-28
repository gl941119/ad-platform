pragma solidity ^0.4.23;
import "./TokenERC20Standart.sol";

contract BeringiaContract is TokenERC20Standart{
    mapping (address => bool) public frozenAccount;
    event FrozenFunds(address target, bool frozen);
    using SafeMath for uint256;

    string public name;                         // token name
    uint256 public decimals;                    // Amount of decimals for display purposes
    string public symbol;                       // symbol token
    string public version;                      // contract version

    uint256 public tokenCreationCap;                    // count created tokens



    constructor () public {
        name = "ACCURATE FLOW";                                          // Set the name for display purposes
        decimals = 18;                                               // Amount of decimals for display purposes
        symbol = "AFD";                                             // Set the symbol for display purposes
        // owner = 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef;         // Set contract owner
        version = "0.0.1";                                          // Set contract version
        tokenCreationCap = 2100000000 * 10 ** uint256(decimals);
        balances[owner] = tokenCreationCap;                         // Give the creator all initial tokens
        emit Transfer(address(0x0), owner, tokenCreationCap);
    }
    
   

    function freezeAccount(address target, bool freeze) onlyOwner public {
        frozenAccount[target] = freeze;
        emit FrozenFunds(target, freeze);
    }
    function _transfer(address _from, address _to, uint _value) internal {
        assert(_value > 0);
        require (_to != 0x0);
        require (balances[_from] >= _value);
        require (balances[_to] + _value >= balances[_to]);
        require(!frozenAccount[_from]);                     // Check if sender is frozen
        require(!frozenAccount[_to]);                       // Check if recipient is frozen
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(_from, _to, _value);
    }
}
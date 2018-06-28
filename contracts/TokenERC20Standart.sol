pragma solidity ^0.4.23;
import "./TokenERC20.sol";
import "./Pausable.sol";
import "./SafeMath.sol";

contract TokenERC20Standart is TokenERC20, Pausable{

    using SafeMath for uint256;


    // create array with all blances
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;

    /**
    * @dev Fix for the ERC20 short address attack.
    */
    modifier onlyPayloadSize(uint size) {
        require(msg.data.length >= size + 4);
        _;
    }


    function balanceOf(address tokenOwner) public constant whenNotPaused  returns (uint balance) {
        return balances[tokenOwner];
    }

    function transfer(address to, uint256 tokens) public  whenNotPaused onlyPayloadSize(2*32) returns (bool success) {
        _transfer(msg.sender, to, tokens);
        return true;
    }


    function approve(address spender, uint tokens) public whenNotPaused returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public whenNotPaused onlyPayloadSize(3*32) returns (bool success) {
        assert(tokens > 0);
        require (to != 0x0);
        require(balances[from] >= tokens);
        require(balances[to] + tokens >= balances[to]); // overflow
        require(allowed[from][msg.sender] >= tokens);
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public  whenNotPaused constant returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function _transfer(address _from, address _to, uint _value) internal {
        assert(_value > 0);
        require (_to != 0x0);
        require (balances[_from] >= _value);
        require (balances[_to] + _value >= balances[_to]);
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(_from, _to, _value);
    }



}
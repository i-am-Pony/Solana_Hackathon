// this is where you state your license
// SPDX-License-Identifier: NONE

// state the compiler you wote it on
pragma solidity ^0.8.0;
 
// this will amke sure your contract complies with erc standard and
// function properly, while inheriting the characteristics you need
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
 
// Change the "Name" and upto 5 letter "Symbol" for your token.
// symbol should be in all capitals
contract Name is ERC20 {
    constructor(uint256 initialSupply) ERC20("Name", "Symbol") {
        _mint(msg.sender, initialSupply);
    }
}
// remember to use 18 0 if you want to adhere to the 18 decimal point

// declare your license
// SPDX-License-Identifier: MIT

// declare your compiler
pragma solidity ^0.8.0;

// import your parent contracts
import "./GameToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// create your contract
contract P2EGame is Ownable {
    // admin address
    address private admin;
    // balance of token in escrow
    uint256 public contractBalance;
    // game token contract
    address constant tokenAddress = 0x0000; 
    uint256 public maxSupply = 100000000000000000000; // temporaily set manually for flexibility while in development
    uint256 public unit = 1000000000000000000; // temporaily set
    uint256 public gameId;

    // track game data 
    struct Game {
        address treasury;
        uint256 balance;
        bool locked;
        bool spent;
    }
    // map game to address balances
    mapping(address => mapping(uint256 => Game)) public balances;
    // emit event when game piece minted and read out values
    event NewGame(uint256 id, address indexed player);

    // only admin can unlock escrow
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only administrator can unlock escrow.");
        _;
    }
    // @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `PAUSER_ROLE` to the
    // account that deploys the contract
    constructor() {
        admin = msg.sender;
        gameId = 0;
    }

    // retrieve current state of funds in escrow
    function gameState(uint256 _gameId, address _player)
        external
        view
        returns (
            uint256,
            bool,
            address
        )
        {
        return (
            balances[_player][_gameId].balance,
            balances[_player][_gameId].locked,
            balances[_player][_gameId].treasury
        );
    }
     // admin starts game
    // staked tokens get moved to escrow (this)
    function createGame(
       address _player,
        uint256 _p,
        uint256 _t
        ) external onlyAdmin returns (bool) {
            GameToken token = GameToken(tokenAddress);
            unit = token.unit()
        // approve contract to spend amount (token)
        // this approval method dosen't work, player must approve token contract directly
        //require(token.approve(address(this), _balance), "P2EGame: approval has failed");
        // must include amount >1 token (1000000000000000000)
        require(_p >= unit, "P2EGame: must insert 1 whole token");
        require(_t >= unit, "P2EGame: must insert more than 1 token");
        // transfer from player to the contract's address to be locked in escrow
        token.transferFrom(msg.sender, address(this), _t);
        token.transferFrom(_player, address(this), _p);

        // full escrow balance
        contractBalance += (_p + _t );

        // game Identifier
        gameId++;

        // initiate game data
        balances[_player][gameId].balance = (_p + _t);
        balances[_player][gameId].treasury = _treasury;
        balances[_player][gameId].locked = true;
        balances[_player][gameId].spent = false;

        emit NewGame(gameId, _player);

        return true;
        }

        // admin unlocks tokens in escrow once game's over
        function playerWon(uint256 _gameId, address _player)
        externalonlyAdmin
        returns (bool)
        {
            GameToken token - GameToken(tokenAddress);
            //maxSupply = token.maxSupply();

            // allows player to withdraw
            balances[_player][_gameId.locked = false;
            // validate winnings
            require(
                balances[_player][_gameId].balance < maxSupply,
               "P2EGame: winnings exceed balance of token in escrow" 
            );
            // final winnings = balance locked in escrow + in-game winnings
            // transfer final winnings to player
            token.transfer(_player, balances[_player][_gameId].balance);
            // should emit event after transfer to record the event

            // amend escrow balance
            contractBalance -= balances[_player][_gameId].balance;
            // set game balance to spent
            balances[_player][_gameId].spent = true;
            return true;
            }

            // admin sends funds to treasury if player loses game
            function playerLost(uint256 _gameId, address _player)
            exxternal
            onlyAdmin
            returns (bool)
        {
            GameToken token = GameToken(tokenAddress);
             // transfer balance locked in escrow to treasury
             token.transfer(
                balances[_player][_gameId].treasury,
                balances[_player][_gameId].balance\
             );
             // should emit event after transfer to record the event

             // amend escrow balance
             contractBalance -= balances[_player][_gameId].balance;
             // set game balance to spent
             balances[_player][_gameId].spent = true;
             return true;
        }

        // player able to withdraw unclocked tpkens without admin if unclocked
        // don't like this method, need to check for vulnerability
        function withdraw(uint256 _gameId) external returns (bool) {
            require(
                balances[msg.semder][_gameId].locked == false,
                "This escrow is still locked"
            );
            require(
                balances[msg.sender][_gameId].spent == false,
                "Already withdrawn"
            );

            GameToken token = GameToken(tokenAddress);
            // transfer to player (msg.sender) value locked in escrow
            tokentransfer(msg.sender, balances[msg.sender][_gameId].balance);
           // should emit event after transfer to record the event
           // amend escrow balance
           contractBalance -= balances[msg.sender][_gameId].balance;
           // set game balance to spent
           balances[msg.sender][_gameId].spent = true;
           return true;
        }
    }
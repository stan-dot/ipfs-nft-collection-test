// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {NftOwnershipToken} from "./Token.sol";

/// @title A very simple lottery contract
/// @author Matheus Pagani
/// @notice You can use this contract for running a very simple lottery
/// @dev This contract implements a weak randomness source
/// @custom:teaching This is a contract meant for teaching only
contract LandscapePhotoNftCollection is Ownable {
    /// @notice Address of the token used as payment for the bets
    NftOwnershipToken public paymentToken;
    /// @notice Amount of ETH charged per Token purchased
    uint256 public purchaseRatio;
    /// @notice Amount of tokens required for placing a bet that goes for the prize pool
    uint256 public betPrice;
    /// @notice Amount of tokens required for placing a bet that goes for the owner pool
    uint256 public mintFee;

    /// @notice Amount of tokens in the owner pool
    uint256 public ownerPool;

    /// @notice Mapping of prize available for withdraw for each account
    mapping(address => uint256) public prize;


    /// @notice Constructor function
    /// @param tokenName Name of the token used for payment
    /// @param tokenSymbol Symbol of the token used for payment
    /// @param _purchaseRatio Amount of ETH charged per Token purchased
    /// @param _betPrice Amount of tokens required for placing a bet that goes for the prize pool
    /// @param _mintFee Amount of tokens required for placing a bet that goes for the owner pool
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _purchaseRatio,
        uint256 _betPrice,
        uint256 _mintFee
    ) {
        paymentToken = new NftOwnershipToken(tokenName, tokenSymbol);
        purchaseRatio = _purchaseRatio;
        betPrice = _betPrice;
        mintFee = _mintFee;
    }

    /// @notice Give tokens based on the amount of ETH sent
    function purchaseTokens() public payable {
        paymentToken.mint(msg.sender, msg.value / purchaseRatio);
    }

    /// @notice Withdraw `amount` from the owner pool
    function ownerWithdraw(uint256 amount) public onlyOwner {
        require(amount <= ownerPool, "Not enough fees collected");
        ownerPool -= amount;
        paymentToken.transfer(msg.sender, amount);
    }

    /// @notice Burn `amount` tokens and give the equivalent ETH back to user
    function returnTokens(uint256 amount) public {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount * purchaseRatio);
    }
}

// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.7;

contract DiceGame{

    address owner;

    constructor(){
        owner = msg.sender; 
    }

    modifier onlyOwner{
        require(msg.sender == owner, "Only contract owner can access this function");
        _;

    }

    function getFunds() public view onlyOwner returns(uint) {
        return(address(this).balance);
    }

    function withdrawl() public payable onlyOwner{
        payable(owner).transfer(address(this).balance);
    } 

    function addFunds() public payable onlyOwner{}

    function rollDice() private view returns(uint){
        return (uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 6) + 1;
    }

    function bet(uint number ) payable public returns(uint) {
        require(msg.value > 0, "You need to send money to bet");
        require(msg.value*6 < address(this).balance, "We don't have enough funds for this bet");
        require(number > 0 && number < 7, "Number should be between 1 and 6");

        uint diceRoll  = rollDice();
        if(diceRoll == number){
            payable(msg.sender).transfer(msg.value*600/101);
        }
        return diceRoll;
    }


}

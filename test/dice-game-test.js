const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DiceGame", function () {
  it("Should deploy successfully", async function () {
    const DiceGame = await ethers.getContractFactory("DiceGame");
    const diceGame = await DiceGame.deploy();
    await diceGame.deployed();

    const balaceOf = await diceGame.getFunds();
    expect(balaceOf).to.equal(0);
  });
  it("Should allow owner to add money", async function () {
    const DiceGame = await ethers.getContractFactory("DiceGame");
    const diceGame = await DiceGame.deploy();
    await diceGame.deployed();

    await diceGame.addFunds({ value: ethers.utils.parseEther("1") });
    const balaceOf = await diceGame.getFunds();
    expect(balaceOf).to.equal(ethers.utils.parseEther("1"));
  });

  it("Should not allow another wallet to add money", async function () {
    const DiceGame = await ethers.getContractFactory("DiceGame");
    const diceGame = await DiceGame.deploy();
    await diceGame.deployed();

    const wallet = ethers.getSigners()[0];
    console.log("wallet", wallet);
  });
});

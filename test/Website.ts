// Test title and description for contract Website

const { expect } = require("chai");
import { ethers } from "hardhat";
import { title, description, skills } from "../content.json";

describe("Website", () => {
  const deployContract = async () => {
    const Website = await ethers.getContractFactory("Website");

    const website = await Website.deploy(title, description, skills);
    await website.deployed();
    return { website };
  };

  describe("Deployment", async () => {
    it("Should return the contract address", async function () {
      const { website } = await deployContract();

      expect(await website.address).to.not.equal(0);
    });
    describe("Constructor define good values", () => {
      it("Skills list is ok with base value", async function () {
        const { website } = await deployContract();
        for (let i = 0; i < skills.length; i++) {
          expect(await website.skills(i)).to.equal(skills[i]);
        }
      });
    });
    it("Owner is correctly defined", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      expect(await website.owner()).to.equal(signers[0].address);
    });
  });

  describe("Update", () => {
    it("Should add a skill", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      const skill = "new skill";
      await website.connect(signers[0]).addSkill(skill);
      expect(await website.skills(skills.length)).to.equal(skill);
    });
    it("Should remove a skill", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      await website.connect(signers[0]).removeSkill(1);
      expect(await website.skills(1)).to.equal(skills[2]);
    });

    it("Should update the title", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      const newTitle = "new title";
      await website.connect(signers[0]).setTitle(newTitle);
      expect(await website.title()).to.equal(newTitle);
    });

    it("Should update the description", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      const newDescription = "new description";
      await website.connect(signers[0]).setDescription(newDescription);
      expect(await website.description()).to.equal(newDescription);
    });
  });
});

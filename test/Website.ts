// Test title and description for contract Website

const { expect } = require("chai");
import { ethers } from "hardhat";
import { deployContract } from "../scripts/functions";
import { title, description, skills, projects } from "../content.json";

describe("Website", () => {
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
      it("Title is correctly defined", async function () {
        const { website } = await deployContract();
        expect(await website.title()).to.equal(title);
      });
      it("Description is correctly defined", async function () {
        const { website } = await deployContract();
        expect(await website.description()).to.equal(description);
      });
      it("Projects list is ok with base value", async function () {
        const { website } = await deployContract();
        for (let i = 0; i < projects.length; i++) {
          const project = await website.projects(i);
          expect(project.title).to.equal(projects[i].title);
          expect(project.description).to.equal(projects[i].description);
          expect(project.date).to.equal(projects[i].date);
          expect(project.image).to.equal(projects[i].image);
          expect(project.url).to.equal(projects[i].url);
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

    it("Should add a project", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      const newProject = {
        title: "new title",
        description: "new description",
        date: "new date",
        image: "new image",
        url: "new url",
      };
      await website
        .connect(signers[0])
        .addProject(
          newProject.title,
          newProject.description,
          newProject.date,
          newProject.image,
          newProject.url
        );
      const project = await website.projects(projects.length);
      expect(project.title).to.equal(newProject.title);
      expect(project.description).to.equal(newProject.description);
      expect(project.date).to.equal(newProject.date);
      expect(project.image).to.equal(newProject.image);
      expect(project.url).to.equal(newProject.url);
    });

    it("Should remove a project", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      await website.connect(signers[0]).removeProject(1);
      const project = await website.projects(1);
      expect(project.title).to.equal(projects[2].title);
      expect(project.description).to.equal(projects[2].description);
      expect(project.date).to.equal(projects[2].date);
      expect(project.image).to.equal(projects[2].image);
      expect(project.url).to.equal(projects[2].url);
    });

    it("Should update a project", async function () {
      const { website } = await deployContract();
      const signers = await ethers.getSigners();
      const newProject = {
        title: "new title",
        description: "new description",
        date: "new date",
        image: "new image",
        url: "new url",
      };
      await website
        .connect(signers[0])
        .updateProject(
          1,
          newProject.title,
          newProject.description,
          newProject.date,
          newProject.image,
          newProject.url
        );
      const project = await website.projects(1);
      expect(project.title).to.equal(newProject.title);
      expect(project.description).to.equal(newProject.description);
      expect(project.date).to.equal(newProject.date);
      expect(project.image).to.equal(newProject.image);
      expect(project.url).to.equal(newProject.url);
    });
  });
});

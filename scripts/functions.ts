import { ethers } from "hardhat";
import { title, description, skills, projects, about } from "../content.json";

const abiCoder = new ethers.utils.AbiCoder();
export const deployContract = async () => {
  const Website = await ethers.getContractFactory("Website");

  const website = await Website.deploy(
    title,
    description,
    about,
    skills,
    projects.map((project) => project.title),
    projects.map((project) => project.description),
    projects.map((project) => project.date),
    projects.map((project) => project.image),
    projects.map((project) => project.url),
    abiCoder.encode(
      ["uint256[][]", "string"],
      [projects.map((project) => project.skills), "no"]
    )
  );

  await website.deployed();

  return { website };
};

import { ethers } from "hardhat";
import { title, description, skills } from "../content.json";
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock");
  const Website = await ethers.getContractFactory("Website");

  const website = await Website.deploy(title, description, skills);
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();
  await website.deployed();
  console.log("Website deployed to:", website.address);
  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
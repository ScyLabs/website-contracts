// SPDX-License-Identifier: UNLICENSED
 pragma solidity ^0.8.17;


import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

    
// Website contract with title and description

contract Website is Ownable {
    string public title;
    string public description;

    //skill tabs
    string[] public skills;
    

    constructor(string memory _title, string memory _description, string[] memory _skills) {
        title = _title;
        description = _description;
        skills = _skills;
    }

    
    function addSkill(string memory _skill) public onlyOwner {
        skills.push(_skill);
    }


    function updateSkill(uint _index, string memory _skill) public onlyOwner {
        skills[_index] = _skill;
    }

    
    function removeSkill(uint _index) public onlyOwner {
        //delete skills[_index];
        string[] memory newSkills = new string[](skills.length - 1);
        
        for(uint i = 0; i < skills.length; i++){
            if(i < _index){
                newSkills[i] = skills[i];
            } else if(i > _index){
                newSkills[i-1] = skills[i];
            }
        }
        skills = newSkills;
    }

    
    function setTitle(string memory _title) public onlyOwner {
        title = _title;
    }

    function setDescription(string memory _description) public onlyOwner {
        description = _description;
    }
}
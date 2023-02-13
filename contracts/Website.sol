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

    struct Project {
        string title;
        string description;
        string date;
        string image;
        string url;
    }
    Project[] public projects;
    
    
    constructor(string memory _title, string memory _description, string[] memory _skills, string[] memory _projectTitles, string[] memory _projectDescriptions, string[] memory _projectDates, string[] memory _projectImages, string[] memory _projectUrls) {
        title = _title;
        description = _description;
        skills = _skills;

        for(uint i = 0; i < _projectTitles.length; i++){
            projects.push(Project(_projectTitles[i], _projectDescriptions[i], _projectDates[i], _projectImages[i], _projectUrls[i]));
        }
        
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function addProject(string memory _title, string memory _description, string memory _date, string memory _image, string memory _url) public onlyOwner {
        projects.push(Project(_title, _description, _date, _image, _url));
    }

    function updateProject(uint _index, string memory _title, string memory _description, string memory _date, string memory _image, string memory _url) public onlyOwner {
        projects[_index] = Project(_title, _description, _date, _image, _url);
    }

    function removeProject(uint256 _index) external onlyOwner {

        // pour empecher un index non attribué
        require(_index < projects.length, "out of range");

        // on remplace la valeur de l'index a supprimer par la valeur du dernier index
        projects[_index] = projects[projects.length - 1];

        // supprime le dernier index
        projects.pop();

    }

    function projectsLength() public view returns(uint256){

        // retourne la longueur du tableau projects
        return projects.length;

    }

    function getSkills() public view returns (string[] memory) {
        return skills;
    }
    
    function addSkill(string memory _skill) public onlyOwner {
        skills.push(_skill);
    }


    function updateSkill(uint _index, string memory _skill) public onlyOwner {
        skills[_index] = _skill;
}

    function skillsLength() public view returns(uint256){
        return skills.length;
    }

    
    function removeSkill(uint _index) public onlyOwner {
        require(_index < skills.length, "out of range");
        skills[_index] = skills[skills.length - 1];
        skills.pop();
    }

    
    function setTitle(string memory _title) public onlyOwner {
        title = _title;
    }

    function setDescription(string memory _description) public onlyOwner {
        description = _description;
    }
}
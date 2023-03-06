// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Website contract with title and description

contract Website is Ownable {
    string public title;
    string public description;

    string public about;

    //skill tabs
    string[] public skills;

    struct Link {
        string name;
        string url;
        string icon;
    }

    struct Project {
        string title;
        string description;
        string date;
        string image;
        string url;
    }

    Project[] public projects;
    Link[] public links;

    string[] public projectSkills;

    mapping(uint => uint) public projectLinks;

    mapping(uint => uint[]) public projectSkillsIndexes;

    constructor(
        string memory _title,
        string memory _description,
        string memory _about,
        string[] memory _skills,
        string[] memory _projectTitles,
        string[] memory _projectDescriptions,
        string[] memory _projectDates,
        string[] memory _projectImages,
        string[] memory _projectUrls,
        bytes memory otherBytes /*
        bytes memory _links*/
    ) {
        title = _title;
        description = _description;
        about = _about;
        skills = _skills;

        (uint[][] memory _projectSkills, string memory no) = abi.decode(
            otherBytes,
            (uint[][], string)
        );

        /*(
            string[] memory _linkNames,
            string[] memory _linkUrls,
            string[] memory _linkIcons,
            uint[] memory _projectLinkIndexes
        ) = abi.decode(_links, (string[], string[], string[], uint[]));*/

        for (uint i = 0; i < _projectTitles.length; i++) {
            projects.push(
                Project(
                    _projectTitles[i],
                    _projectDescriptions[i],
                    _projectDates[i],
                    _projectImages[i],
                    _projectUrls[i]
                )
            );
        }

        for (uint i = 0; i < _projectSkills.length; i++) {
            projectSkillsIndexes[i] = _projectSkills[i];
        }
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getProjectSkills(
        uint _projectIndex
    ) public view returns (string[] memory) {
        console.log("ok");
        string[] memory _skills;
        uint[] memory skillsIndexes = projectSkillsIndexes[_projectIndex];

        for (uint i = 0; i < skillsIndexes.length; i++) {
            _skills[i] = skills[skillsIndexes[i]];
        }

        return _skills;
    }

    function addProject(
        string memory _title,
        string memory _description,
        string memory _date,
        string memory _image,
        string memory _url
    ) public onlyOwner {
        projects.push(Project(_title, _description, _date, _image, _url));
    }

    function updateProject(
        uint _index,
        string memory _title,
        string memory _description,
        string memory _date,
        string memory _image,
        string memory _url
    ) public onlyOwner {
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

    function projectsLength() public view returns (uint256) {
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

    function skillsLength() public view returns (uint256) {
        return skills.length;
    }

    function removeSkill(uint _index) public onlyOwner {
        require(_index < skills.length, "out of range");
        skills[_index] = skills[skills.length - 1];
        skills.pop();
    }

    function setAbout(string memory _about) public onlyOwner {
        about = _about;
    }

    function setTitle(string memory _title) public onlyOwner {
        title = _title;
    }

    function setDescription(string memory _description) public onlyOwner {
        description = _description;
    }
}

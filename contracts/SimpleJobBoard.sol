// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleJobBoard {
    struct Job {
        uint id;
        address poster;
        string title;
        string description;
        bool isOpen;
    }

    uint public nextJobId;
    mapping(uint => Job) public jobs;

    event JobPosted(uint id, address poster, string title);
    event JobClosed(uint id);

    function postJob(string memory title, string memory description) public {
        jobs[nextJobId] = Job(nextJobId, msg.sender, title, description, true);
        emit JobPosted(nextJobId, msg.sender, title);
        nextJobId++;
    }

    function closeJob(uint jobId) public {
        require(jobs[jobId].poster == msg.sender, "Not job poster");
        require(jobs[jobId].isOpen, "Job already closed");
        jobs[jobId].isOpen = false;
        emit JobClosed(jobId);
    }

    function getJob(uint jobId) public view returns (Job memory) {
        return jobs[jobId];
    }
}

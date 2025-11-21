// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleJobBoard {
    struct Job {
        uint id;
        address poster;
        address freelancer;
        string title;
        string description;
        uint payment;
        bool isOpen;
    }

    struct Reputation {
        uint totalScore;
        uint reviewCount;
    }

    uint public nextJobId;
    mapping(uint => Job) public jobs;
    mapping(address => Reputation) public reputations;

    event JobPosted(uint id, address poster, string title, uint payment);
    event JobClosed(uint id);
    event ReviewSubmitted(address freelancer, uint score, uint newTotalScore, uint newReviewCount);

    function postJob(string memory title, string memory description, uint payment) public payable {
        require(msg.value == payment, "Payment must match job payment");
        jobs[nextJobId] = Job(nextJobId, msg.sender, address(0), title, description, payment, true);
        emit JobPosted(nextJobId, msg.sender, title, payment);
        nextJobId++;
    }

    function assignFreelancer(uint jobId, address freelancer) public {
        require(jobs[jobId].poster == msg.sender, "Not job poster");
        require(jobs[jobId].isOpen, "Job is not open");
        require(jobs[jobId].freelancer == address(0), "Freelancer already assigned");
        jobs[jobId].freelancer = freelancer;
    }

    function closeJob(uint jobId) public {
        require(jobs[jobId].poster == msg.sender, "Not job poster");
        require(jobs[jobId].isOpen, "Job already closed");
        jobs[jobId].isOpen = false;

        address freelancer = jobs[jobId].freelancer;
        require(freelancer != address(0), "No freelancer assigned to this job");
        payable(freelancer).transfer(jobs[jobId].payment);

        emit JobClosed(jobId);
    }

    function leaveReview(uint jobId, uint score) public {
        require(jobs[jobId].poster == msg.sender, "Not job poster");
        require(!jobs[jobId].isOpen, "Job must be closed to leave review");
        require(score > 0 && score <= 5, "Score must be between 1 and 5");

        address freelancer = jobs[jobId].freelancer;
        require(freelancer != address(0), "No freelancer assigned to this job");

        reputations[freelancer].totalScore += score;
        reputations[freelancer].reviewCount++;

        emit ReviewSubmitted(freelancer, score, reputations[freelancer].totalScore, reputations[freelancer].reviewCount);
    }

    function getJob(uint jobId) public view returns (Job memory) {
        return jobs[jobId];
    }

    function getReputation(address user) public view returns (Reputation memory) {
        return reputations[user];
    }
}
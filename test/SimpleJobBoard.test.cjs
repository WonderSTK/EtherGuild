const { expect } = require("chai");

describe("SimpleJobBoard", function () {
  let jobBoard;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const SimpleJobBoard = await ethers.getContractFactory("SimpleJobBoard");
    [owner, addr1, addr2] = await ethers.getSigners();
    jobBoard = await SimpleJobBoard.deploy();
    await jobBoard.waitForDeployment();
  });

  describe("Job Posting", function () {
    it("Should post a job and increment nextJobId", async function () {
      const title = "Test Job";
      const description = "This is a test job description";
      
      await expect(jobBoard.postJob(title, description))
        .to.emit(jobBoard, "JobPosted")
        .withArgs(0, owner.address, title);
      
      expect(await jobBoard.nextJobId()).to.equal(1);
    });

    it("Should store job details correctly", async function () {
      const title = "Frontend Developer";
      const description = "React and Web3 expert needed";
      
      await jobBoard.postJob(title, description);
      
      const job = await jobBoard.getJob(0);
      expect(job.id).to.equal(0);
      expect(job.poster).to.equal(owner.address);
      expect(job.title).to.equal(title);
      expect(job.description).to.equal(description);
      expect(job.isOpen).to.be.true;
    });
  });

  describe("Job Closing", function () {
    beforeEach(async function () {
      await jobBoard.postJob("Test Job", "Test Description");
    });

    it("Should allow job poster to close job", async function () {
      await expect(jobBoard.closeJob(0))
        .to.emit(jobBoard, "JobClosed")
        .withArgs(0);
      
      const job = await jobBoard.getJob(0);
      expect(job.isOpen).to.be.false;
    });

    it("Should not allow non-poster to close job", async function () {
      await expect(jobBoard.connect(addr1).closeJob(0))
        .to.be.revertedWith("Not job poster");
    });

    it("Should not allow closing already closed job", async function () {
      await jobBoard.closeJob(0);
      await expect(jobBoard.closeJob(0))
        .to.be.revertedWith("Job already closed");
    });
  });
});

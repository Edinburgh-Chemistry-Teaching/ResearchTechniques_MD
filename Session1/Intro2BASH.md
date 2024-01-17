# Session 1: Intro to Linux

In this session, we will:


- ==learn what is Linux and why we use it==
- ==begin using shell==
- ==learn about comp chem resources==
- [ ==TBC - overleaf/latex== ]



This session is based upon [**The Unix Shell**](https://swcarpentry.github.io/shell-novice/), the [**Introduction to Using the Shell in a High-Performance Computing Context**](http://www.hpc-carpentry.org/hpc-shell/) and [**Introduction to High-Performance Computing**](https://epcced.github.io/hpc-intro/) courses by the [Software Carpentry](https://swcarpentry.github.io)
 
Summary of basic bash commands [https://swcarpentry.github.io/shell-novice/reference](https://swcarpentry.github.io/shell-novice/reference)

---

The lesson outline:

* PART 1 -- Navigating Files and Directories 
* PART 2 -- Working With Files and Directories
* PART 3 -- Pipes and Filters (Advanced)
* PART 4 -- Loops (Advanced)
* PART 5 -- Shell Script (Advanced)
* PART 6 -- Finding things (Advanced)
* PART 7 -- Using high-performance computers

There are **Questions** and **Tasks** provided to give you practice. All of these have Answers/Solutions in a drop-down below. 
These are practice exercises to be attended after the session (or only if you have time during the session). 

We have also provided you with extra material if you find yourself keen to learn more. 
Therefore, for the purpose of this course, you should do **Part 1**, **Part 2**, and **Part 7**.
**Parts 3 - 6** are beneficial, especially if you are planning to use these skills beyond this course, but are not essential for the following sessions. 

---

## **SHELL**
	
**WHAT?**

* Command line interface between YOU and UNIX (& its friends).
* Its purpose is to read commands and run other programs.

**WHY?**

* Shell has high action-to-keystroke ratio, great for automating repetitive tasks.
* Helps access (and manage) networked machines and high-performance computing resources.
	
**HOW?**
	
* Programs can be run in Bash by entering commands at the command-line prompt (terminal).
* Must know commands and how to use them (**the goal of this session**)

---


### Nelle’s Pipeline: A Typical Problem
Nelle Nemo, a marine biologist, has just returned from a six-month survey of the [North Pacific Gyre](https://en.wikipedia.org/wiki/North_Pacific_Gyre), where she has been sampling gelatinous marine life in the [Great Pacific Garbage Patch](https://en.wikipedia.org/wiki/Great_Pacific_Garbage_Patch). She has 1520 samples that she’s run through an assay machine to measure the relative abundance of 300 proteins. She needs to run these 1520 files through an imaginary program called `goostats.sh`. In addition to this huge task, she has to write up results by the end of the month, so her paper can appear in a special issue of Aquatic Goo Letters.

If Nelle chooses to run `goostats.sh` by hand using a GUI, she’ll have to select and open a file 1520 times. If `goostats.sh` takes 30 seconds to run each file, the whole process will take more than 12 hours of Nelle’s attention. With the shell, Nelle can instead assign her computer this mundane task while she focuses her attention on writing her paper.

In this session will explore the ways Nelle can achieve this. More specifically, the practical explains how she can use a command shell to run the `goostats.sh` program, using loops to automate the repetitive steps of entering file names, so that Nelle's computer can work while she writes her paper.

As a bonus, once she has put a processing pipeline together, she will be able to use it again whenever she collects more data.
 
In order to achieve her task, Nelle needs to know how to:

 * navigate to a file/directory
 * create a file/directory
 * check the length of a file
 * chain commands together
 * retrieve a set of files
 * iterate over files
 * run a shell script containing her pipeline

------

**Click on the links below to continue through the parts today's session:** 

PART 1 -- Navigating Files and Directories (Help Nelle organise the files)

<!-- End of 1st hour-->

PART 2 -- Working With Files and Directories

PART 3 -- Pipes and Filters (Nelle’s Pipeline: Checking Files)

PART 4 -- Loops (Nelle’s Pipeline: Processing Files)

<!-- End of 2nd hour-->

PART 5 -- Shell Script (Nelle’s Pipeline: Creating a Script)

PART 6 -- Finding things

PART 7 -- Using high-performance computers

<!-- End of 3rd hour-->


## At the end of Session 1, you should be able to:

* Understand what is shell and command line interface, know when one would use it
* Be able to navigate around directories and look up their contents 
* Use options and arguments to change the behaviour of shell commands
* Know what is the path, be able to translate a relative path into an absolute and vice-versa 
* Create, edit, move and delete files and directories 
* Edit text using `nano`
* Know what is a script and be able to run it
* Connect to Eddie HPC
* Transfer files between a local and a remote machine
* Run a simple job on Eddie HPC



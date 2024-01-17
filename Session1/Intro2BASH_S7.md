# PART 7 -- Using high performance computers

👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Pipes and Filters](Intro2BASH_S6.md)<br>


We have seen above how using a command-line interface instead of a GUI and creating scripts can save us valuable time running the analysis. Still, depending on the job we need to do, the time-limiting step can be the performance of our laptop/desktop. In this case, we need access to a more powerful machine. There are numerous large computers with shared computing resources available: from smaller machines in research groups, to the University ones, to national facilities.  

These resources on these machines typically have larger numbers and sizes of central processing units (CPUs), CPUs that operate at higher speeds, more memory, more storage, and faster connections with other computer systems. They are frequently called “clusters”, “supercomputers” or resources for “high-performance computing” or HPC. 

Using a cluster often has the following advantages for researchers:

* **Speed**. With many more CPU cores, often with higher performance specs, than a typical laptop or desktop, HPC systems can offer significant speed up.
* **Volume**. Many HPC systems have both the processing memory (RAM) and disk storage to handle very large amounts of data. Terabytes of RAM and petabytes of storage are available for research projects.
* **Efficiency**. Many HPC systems operate a pool of resources that are drawn on by many users. In most cases, when the pool is large and diverse enough, the resources on the system are used almost constantly. This also means that the user can run jobs in parallel and a number of jobs simultaniously.
* **Cost**. Bulk purchasing and government funding mean that the cost to the research community for using these systems in significantly less that it would be otherwise.
* **Convenience**. Maybe your calculations just take a long time to run or are otherwise inconvenient to run on your personal computer. There’s no need to tie up your own computer for hours when you can use someone else’s instead;)


The University of Edinburgh has a supercomputer [Eddie](https://www.ed.ac.uk/information-services/research-support/research-computing/ecdf/high-performance-computing), which we will be using during this practical. Furthermore, UoE is a host to national supercomputing facilities [ARCHER2](https://www.archer2.ac.uk) and [Cirrus](https://www.cirrus.ac.uk), available to researchers in the UK.


In this part of the session we will apply the bash skills we have learned earlier to connect and use Eddie HPC. In the following sessions, we will be using Eddie HPC to run our calculations.


### 1. Connecting to a remote machine

Connecting to an HPC system is most often done through a tool known as SSH, for **s**ecure **sh**ell, and usually SSH is run through a terminal. So, to begin using an HPC system, we need to open a terminal. 

We suggest opening a new terminal, so you can have two terminals in parallel - one for working on local machine, one for working on Eddie.

Into the terminal type without brackets:

```bash
$ ssh <UUN>@eddie.ecdf.ed.ac.uk
```
where `<UUN>` should be replaced with your university credentials, typically starting with `s`, for example:

```
$ ssh s1234567@eddie.ecdf.ed.ac.uk
```

The terminal will prompt you for the password, which is your university password. Note, that there will be no spaces/stars/symbols filling up when you are typing the password in, the display will not change. When you are done, hit 'Enter'.

When successfully logged in, you will see:

```
         _______    _     _ _       
        (_______)  | |   | (_)      
         _____   _ | | _ | |_  ____ 
        |  ___) / || |/ || | |/ _  )
        | |____( (_| ( (_| | ( (/ / 
        |_______)____|\____|_|\____)

	WELCOME TO Eddie

        www.ecdf.ed.ac.uk
_____________________________________________________________________

A guide to getting started is available here:
https://www.wiki.ed.ac.uk/display/ResearchServices/Quickstart

Service documentation is here:
https://www.wiki.ed.ac.uk/display/ResearchServices/Eddie

Please report any issues to IS.Helpline@ed.ac.uk
_____________________________________________________________________
```

### 2. Telling the difference between local and remote terminal 

You may have also noticed that the prompt changed when you logged into the remote system from `$` to a more complete `[nelle@login03(eddie) ~]$ `.

This change is important because it makes it clear on which system the commands you type will be run when you pass them into the terminal. Exactly what is reported before the `$` in the terminal when it is connected to the local system and the remote system will typically be different for every user.

Just like on your local machine, you can use the commands `cd`, `ls`, `pwd`, etc. to navigate around, as well as all the other commands we have used above. 

### 3. File structure

Unlike your local machine, the file structure of Eddie is different, offering a variety of storage options/locations to cater for different types of work. 

When you log into the machine, you automatically land at your **home directory**. Check what it is by typing:

```bash
[nelle@login03(eddie) ~]$ pwd
```
which will show:

```
/home/nelle
```
This home directory space is small, default only 10 Gb, and can be used to store cluster configuration files/ job scripts and small amounts of persistent data. It is not suitable for the large files produced by the simulations. 

Instead, there is a **scratch directory**, a large 2 Tb space, shared by all users of Eddie, where we will be running our simulations from. 

> ***WARNING*** ⚠️  *Files older than one month will be deleted from Scratch directory.*
> This is enough time for the duration of our course, but if you would like to keep your data, it will have to be moved onto your personal Datastore.


Let's explore that space:

```bash
[nelle@login03(eddie) ~]$ cd /exports/eddie/scratch/<UUN>
```
Replace `<UUN>` with your username, for Nelle her user name is `nelle`, and therefore, this is:

```bash
[nelle@login03(eddie) ~]$ cd /exports/eddie/scratch/nelle
```

*Have you noticed that the prompt has changed?*
Instead of `~`, standing for 'home directory', it is now showing the directory you are currently in, i.e. `[nelle@login03(eddie) nelle]$`

In this directory, let's create a folder `Practical1` and descend into it:

```bash
[nelle@login03(eddie) nelle]$ mkdir Practical1
[nelle@login03(eddie) nelle]$ cd Practical1
[nelle@login03(eddie) Practical1]$ pwd
/exports/eddie/scratch/nelle/Practical1
```

Let's remember this location, as it will be the destination for the file transfers.


### 4. Transferring files to the remote machine

To transfer files across computers, we will use `scp`, which stands for **s**ecure **c**o**p**y. The command works like `cp` that we use when copying files within our own machine, i.e., the command is followed by the file to copy and the location to copy to.

To copy a file from your local machine to your remote machine, there are two options:

1 - When run on your local machine:
```
$ scp /location/directory/file <YOUR UUN>@eddie.ecdf.ed.ac.uk:/destination/directory/
```

2 - When run on your remote machine: 

```
[<UUN>@login03(eddie) Practical1]$ scp <localname>@<localIP>:/location/directory/file /destination/directory/.
```

Let's transfer files `hello.sh` and `myjob.sh` stored within the `Practical1/eddie-hpc-data` directory to the `Practical1` folder we have just created on Eddie. Since both files are `.sh`, instead of typing each in we can use a `*` wildcard.

```bash
$ cd eddie-hpc-data
$ scp *sh nelle@eddie.ecdf.ed.ac.uk:/exports/eddie/scratch/nelle/Practical1
```
You will be prompted for the password, then you will see the report on the file transfer:
```
hello.sh                                                                    100%  271    44.3KB/s   00:00    
myjob.sh                                                                    100%  316    62.2KB/s   00:00  
``` 

If we now check the files from Eddie.

```bash
[nelle@login03(eddie) Practical1]$ pwd
/exports/eddie/scratch/nelle/Practical1
[nelle@login03(eddie) Practical1]$ ls -lrth
total 1.0K
-rw-r--r-- 1 nelle eddie_users 271 Jan 17 11:42 hello.sh
-rw-r--r-- 1 nelle eddie_users 316 Jan 17 11:42 myjob.sh

```
Command `ls -lrth` lists the contents of the directory in an expanded format `-l`, ordering them by time, `-t`, in a reverse, `-r`, order with the newest files at the bottom, and shows the showing the file sizes in human-readable format, `-h`. Explore further options of listing files with `ls --help`.


#### Question 
If you wanted to transfer the whole directory `eddie-hpc-data`, what would you type?


<details>
  <summary>**Answer:**</summary>

To copy a whole directory, we add the `-r` flag, for “recursive”
  
```
$ scp -r eddie-hpc-data nelle@eddie.ecdf.ed.ac.uk:/exports/eddie/scratch/nelle/Practical1
```
</details>



### 5. Using the resources

The HPC is composed of *nodes*, which are individual computers, and they come in different types. 

The node we are logged into is the *head node*, which you see in your prompt as `login03`. This node is made for login, file transfer and manipulation, but it is _not for calculations_. 

The calculations are done on the *compute nodes*. There are different types of these nodes available, to cater for various needs. 

To run a job, you will need to submit a Grid Engine job submission script, that contains details of the program to run as well as requests for resources (compute nodes, memory, time, etc). 

You have just copied over an example job script, `myjob.sh`. Let's examine it  (open it with your favourite command, such as `more myjob.sh`:

```
#!/bin/sh
# Grid Engine options (lines prefixed with #$)
#  job name: -N
#$ -N hello  
#  use the current working directory: -cwd            
#$ -cwd 
#  runtime limit of 5 minutes: -l h_rt                 
#$ -l h_rt=00:05:00 
#  memory limit of 1 Gbyte: -l h_vmem
#$ -l h_vmem=1G


# Run the program
bash hello.sh 
```

This script tells Eddie to run a job named `hello` from the current working directory, requesting a maximum of 5 minutes run time and a maximum memory of 1 GB.
The job itself is a bash script named `hello.sh`.


We can now submit `myjob.sh` using the scheduler command `qsub`. 

```bash
[nelle@login03(eddie) Practical1]$ qsub myjob.sh 
Your job 38945036 ("hello") has been submitted
```
The scheduler assigns this job an ID and reports that the job has been submitted. The scheduler will queue the job, while waiting for the resources to become available.

We can monitor the progress of our job with the command `qstat`:

```bash
[nelle@login03(eddie) Practical1]$ qstat -u nelle
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID 
------------------------------------------------------------------------------------------------------------------------------------------------
  38945036 0.00000 hello      nelle     qw    01/17/2024 12:13:09                                                                   1        
```
This tells us that the job is currently queuing `qw` for resources; since we are not asking for much, it should not take long for it to run, and then the state will show as `r`. Nevertheless, the job is very small and will take an instance to run, so we may even miss it.

If you have made a mistake and want to cancel the job, you can do it with the command `qdel JobId`, where `JobID` is the number that was assigned to your job by the scheduler, here `38945036`.


Unlike on a personal machine, running jobs do not print onto your screen (imagine the mess it would make if you were running many jobs at the same time). Instead, the two extra files are written:

- `<name>.o<JobID>` that contains the output you would normally receive on the screen;
- `<name>.e<JobID>` that contains any errors or HPC-related info.

Let's examine the files you got:

```bash
[nelle@login03(eddie) Practical1]$ ls -lrth
total 1.5K
-rw-r--r-- 1 nelle eddie_users 271 Jan 17 11:42 hello.sh
-rw-r--r-- 1 nelle eddie_users 316 Jan 17 11:42 myjob.sh
-rw-r--r-- 1 nelle eddie_users   0 Jan 17 12:13 hello.e38945036
-rw-r--r-- 1 nelle eddie_users 104 Jan 17 12:13 hello.o38945036
```
And now read the `hello.o38945036`:

```bash
[nelle@login03(eddie) Practical1]$ more hello.o38945036 
Hello World!
I am: nelle
It is now: Wed 17 Jan 12:13:25 GMT 2024
I am using: node2c01.ecdf.ed.ac.uk

```
This is the output of our `hello.sh` script - feel free to modify it to your liking.

### 7. Logging out
Not every job will run over a few minutes, but using an HPC with a job scheduler means that you do not need ot remain logged in for the job to be running. HPC will continue to do its job while you are sleeping, away or on holiday.

To log out from Eddie just type `exit`

```bash
[nelle@login03(eddie) Practical1]$ exit
```




<!-- to be moved to the next session

### 7. Using modules 

Eddie HPC provides a number of [applications](https://www.wiki.ed.ac.uk/display/ResearchServices/Applications) = software to cater for various types of calculations that may be performed. 

Unlike on our personal machine, where all of the applications are always available to us, here the seer number of applications will make it very demanding to load up in one go for every user. Therefore, users will need to load the modules they need:

You can see what modules are available with the command:
```module available```
and you can make them available, by loading them::
```module load <MODULENAME/MODULEVERSION>```
For a list of currently loaded modules, run:
```module list```

-->


<!-- for another session

### Moving data to datastore?

Stagging  - i.e. data transfer to datastore?

-->


👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Pipes and Filters](Intro2BASH_S6.md)<br>

# Session 1: Intro to Linux

In this session, we will:


- ==learn what is Linux and why we use it==
- ==begin using shell==
- ==learn about comp chem resources==
- [ ==TBC - overleaf/latex== ]



This session is based upon [**The Unix Shell**](https://swcarpentry.github.io/shell-novice/) and the  [**Introduction to Using the Shell in a High-Performance Computing Context**](http://www.hpc-carpentry.org/hpc-shell/) courses by the [Software Carpentry](https://swcarpentry.github.io)
 
Summary of basic bash commands [https://swcarpentry.github.io/shell-novice/reference](https://swcarpentry.github.io/shell-novice/reference)

---

The lesson outline:

* PART 1 -- Navigating Files and Directories
* Help Nelle organise the files
* PART 2 -- Working With Files and Directories
* PART 3 -- Pipes and Filters
* Nelle’s Pipeline: Checking Files
* PART 4 -- Loops
* Nelle’s Pipeline: Processing Files
* PART 5 -- Shell Script
* Nelle’s Pipeline: Creating a Script
* PART 6 -- Finding things
* PART 7 -- Connecting to the remote machine 

There are many questions and small tasks given, all have Answers/Solutions in a drop-down under. 
These are practice exercises to be attended after the session (or only if you have time during the session). 

Later tasks provide more advanced materials, which are there for keen users only. 


---


## PART 1 -- Navigating Files and Directories

### **SHELL**
	
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
Nelle Nemo, a marine biologist, has just returned from a six-month survey of the [North Pacific Gyre](https://en.wikipedia.org/wiki/North_Pacific_Gyre), where she has been sampling gelatinous marine life in the [Great Pacific Garbage Patch](https://en.wikipedia.org/wiki/Great_Pacific_Garbage_Patch). She has 1520 samples that she’s run through an assay machine to measure the relative abundance of 300 proteins. She needs to run these 1520 files through an imaginary program called goostats.sh. In addition to this huge task, she has to write up results by the end of the month, so her paper can appear in a special issue of Aquatic Goo Letters.

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


### 1. Get Ready

1. Download the file **Session1** from the DataStore  <**LINK**>  
2. Move it to your Desktop
3. Do not rename the folder.


### 2. Open a terminal on your computer

**Something here on how to get started on the VM** 

<==**PICTURE** of the screenshot of the desktop where to find the terminal on the machine==>

Let's check what we see:

<==**PICTURE** of the terminal==>

Here, each line starts with the prompt `$` (can be another user-defined symbol)


_**IMPORTANT**: do not type the prompt_`$`_when typing commands!_
Only type the command that follows the prompt. This rule applies both in these lessons and in lessons from other sources. 
After you type a command, you have to press the `ENTER` key to execute it.

The prompt is followed by a *text cursor*, a flashing [or solid black] cursor that indicates the position where your typing will appear.

Often, before the prompt symbol, there will be some information on the user, the machine, and even the directory currently in, for example:

```bash
[nelle@login04(eddie) ~]$ 
```
Do not worry about all this; just make sure to type in only what is given after `$` into your terminal.


### 3. Navigate to the working directory

Typing the following into the terminal, press `ENTER` after each new line command:

```bash
$ cd
``` 
`cd` stands for **c**hange **d**irectory; this command by itself sends you to your home directory.

Find out what is your home directory:

```bash
$ pwd
```
`pwd` stands for **p**rint **w**orking **d**irectory


Which will return the line:

```bash
/Users/nelle
```
Every time you type in `cd` without anything after, you will land in this location.


Use the command `ls` to **l**i**s**t the contents of this current directory:

```bash
$ ls
```

This will display the directories within the current one, and you will see something like:

```bash
Desktop     Downloads   Movies      Pictures
Documents   Library     Music       Public
```

Note, if you mistype the command, for example, try:

```bash 
$ kls
```
shell will inform you that it does not exist:

```
kls: command not found
```

Now, continue into the directory `Practical1` you downloaded earlier:

First, go to the directory `Desktop`:

```bash
$ cd Desktop
```
Check the directories on the desktop:

```bash
$ ls
```

You should see the list, with one of them called `Practical1`. Now, go to that directory:

```bash
$ cd Practical1
```

We have now navigated from the *home directory* to the *current working directory*. 
 
#### Let's have a look at how the file system is organised.
 
![filesystem](filesystem.svg)
 
The filesystem looks like an upside-down tree. The topmost directory is the *root directory* that holds everything else. We refer to it using a slash character, `/`, on its own; this character is the leading slash in `/Users/nelle`.
 
Inside that directory are several other directories: 

* `bin` (this is not the rubbish bin, but where  some built-in programs are stored), 
* `data` (for miscellaneous data files), 
* `Users` (where users’ personal directories are located), 
* `tmp` (for temporary files that don’t need to be stored long-term).
 
We know that our current working directory `/Users/nelle` is stored inside `/Users` because `/Users` is the first part of its name. Similarly, we know that `/Users` is stored inside the root directory `/` because its name begins with `/`.

![home-dirs](home-directories.svg)
 
Underneath `/Users`, we find one directory for each user with an account on Nelle’s machine, her colleagues `imhotep` and `larry`.  
Their files are stored in `/Users/Imhotep` and in `/Users/larry`, respectively.
While Nelle’s are in `/Users/nelle`.

Nelle is the user in our examples here; therefore, we get `/Users/nelle` as our home directory. Typically, when you open a new command prompt, you will be in your home directory to start.


### 4. Exploring the contents of the directory

Not only can we use `ls` on the current working directory, but we can use it to list the contents of a different directory. 

Let’s take a look at the contents of the `Practical1` (our current directory) and the directory within it:

```bash
$ ls
```
that returns contents of current directory:

```bash
shell-lesson-data
```
and then list the contents of `shell-lesson-data`, without descending into the directory:

```bash
$ ls Practical1/shell-lesson-data
```

that returns:
```bash
exercise-data      north-pacific-gyre
```

Now, let's descent into the `exercise-data` in one step:

```bash
$ cd shell-lesson-data/exercise-data
```

Run `pwd` to check the directory you are currently in.

```bash
$ pwd
```

```bash
/Users/nelle/Desktop/Practical1/shell-lesson-data/exercise-data
```

list the contents of the directory:

```bash
$ ls
```

```bash
alkanes/       animal-counts/ creatures/     numbers.txt   writing/
```

From our current directory, we can move into the `north-pacific-gyre` - a subdirectory of the parent directory `shell-lesson-data`, we first need to move a level up:

```bash
$ cd ..
```
`..` is a special directory name meaning “the directory containing this one”, or more succinctly, the parent of the current directory. 

The special directory `..` doesn’t usually show up when we run ls. If we want to display it, we can add the `-a` option to `ls`:

```bash
$ ls -a
```

```bash
.                  ..                 exercise-data/      north-pacific-gyre/
```

now we can descend into the desired directory:

```bash
$ cd north-pacific-gyre
```

So far, when specifying directory names, or even a directory path (as above), we have been using *relative paths*. When you use a relative path with a command like `ls` or `cd`, it tries to find that location from where we are right now, rather than from the root of the file system.

However, it is possible to specify the *absolute path* to a directory by including its entire path from the root directory, which is indicated by a leading slash. The leading `/` tells the computer to follow the path from the root of the file system, so it always refers to exactly one directory, no matter where we are when we run the command.

This allows us to move to our `shell-lesson-data directory` from anywhere on the filesystem (including from inside `exercise-data`). To find the absolute path we’re looking for, we can use `pwd` and then extract the piece we need to move to `shell-lesson-data`.


```bash
$ pwd
/Users/nelle/Desktop/Practical1/shell-lesson-data/north-pacific-gyre
$ cd /Users/nelle/Desktop/Practical1/shell-lesson-data
```
Remember, that the commands are after prompt `$` while the output of the terminal starts on a new line and has no prompt symbol in front.

The other way to indicate an absolute path, with respect to the current user’s home directory, is by using the tilde `~` character at the start of a path. For example, if Nelle’s home directory is `/Users/nelle`, then `~/data` is equivalent to `/Users/nelle/data`.
 
```bash
$ pwd
/Users/nelle/Desktop/Practical1/shell-lesson-data
$ cd ~/Desktop/Practical1/shell-lesson-data/exercise-data
```


---
#### QUESTION 1:

Starting from `/Users/nelle/data`, which of the following commands could Nelle use to navigate to her home directory, which is `/Users/nelle`?

1. `cd .`
2. `cd /`
3. `cd /home/nelle`
4. `cd ../..`
5. `cd ~`
6. `cd home`
7. `cd ~/data/..`
8. `cd`
9. `cd ..`


<details>
  <summary>**ANSWER 1**</summary>

1. No: `.` stands for the current directory.
2. No: `/` stands for the root directory.
3. No: Nelle’s home directory is `/Users/nelle`.
4. No: this command goes up two levels, i.e. ends in `/Users`.
5. ✅: `~` stands for the user’s home directory, in this case `/Users/nelle`.
6. No: this command would navigate into a directory home in the current directory if it exists.
7. ✅: unnecessarily complicated, but correct.
8. ✅: shortcut to go back to the user’s home directory.
9. ✅: goes up one level.
</details>


#### QUESTION 2:

Using the filesystem diagram below, if `pwd` displays `/Users/thing`, what will `ls ../backup` display?

1. `../backup: No such file or directory`
2. `012-12-01 2013-01-08 2013-01-27`
3. `2012-12-01/ 2013-01-08/ 2013-01-27/`
4. `original/ pnas_final/ pnas_sub/`

![filesystem-challenge](filesystem-challenge.svg)

<details>
  <summary>**ANSWER 2**</summary>

1. No: there is a directory backup in `/Users`.
2. No: this is the content of Users/thing/backup, but with `..`, we asked for one level further up.
3. No: see previous explanation.
4. ✅: `../backup/` refers to `/Users/backup/`.
</details>

#### QUESTION 3:

Using the filesystem diagram above, if `pwd` displays /Users/backup, and `-r` tells `ls` to display things in reverse order, what command(s) will result in the following output:

```pnas_sub/ pnas_final/ original/```

1. `ls pwd`
2. `ls -r `
3. `ls -r /Users/backup`

<details>
  <summary>**ANSWER 3**</summary>
  
1. No: `pwd` is not the name of a directory.
2. ✅: `ls` without directory argument lists files and directories in the current directory.
3. ✅: uses the absolute path explicitly.
</details>


---
## Help Nelle organise the files
 
Knowing this much about files and directories, Nelle is ready to organize the files that the protein assay machine will create.
 
She created a directory called `north-pacific-gyre` (to remind herself where the data came from), which contains the data files from the assay machine and her data processing scripts.
 
Each of her physical samples is labelled according to her lab’s convention with a unique ten-character ID, such as ‘NENE01729A’. This ID is what she used in her collection log to record the location, time, depth, and other characteristics of the sample, so she decides to use it within the filename of each data file. Since the output of the assay machine is plain text, she will call her files `NENE01729A.txt`, `NENE01812A.txt`, and so on. All 1520 files will go into the same directory.

Now, in her current directory `shell-lesson-data`, Nelle can see what files she has using the command:

```bash
$ ls north-pacific-gyre/
```

This command is a lot to type, but she can let the shell do most of the work through what is called *tab completion*. If she types:

```bash
$ ls nor
```

and then presses `Tab` (the tab key on her keyboard), the shell automatically completes the directory name for her:

```bash
$ ls north-pacific-gyre/
```

Pressing `Tab` again does nothing, since there are multiple possibilities; pressing `Tab` twice brings up a list of all the files.

If Nelle then types `g` and then presses `Tab` again, the shell will append ‘goo’ since all files that start with ‘g’ share the first three characters ‘goo’.

```bash
$ ls north-pacific-gyre/goo
goodiff.sh   goostats.sh
```
This is called tab completion, and we will see it in many other tools as we go on.


---
> ### KEY POINTS PART 1
> 
> * The file system is responsible for managing information on the disk.
> * Information is stored in files, which are stored in directories (folders).
> * Directories can also store other directories, which then form a directory tree.
> * `pwd` prints the user’s current working directory.
> * `ls [path]` prints a listing of a specific file or directory; `ls` on its own lists the current working directory.
> * `cd [path]` changes the current working directory.
> * Most commands take options that begin with a single `-`.
> * Directory names in a path are separated with `/` on Unix (but `\` on Windows).
> * `/` on its own is the root directory of the whole file system.
> * An absolute path specifies a location from the root of the file system.
> * A relative path specifies a location starting from the current location.
> * `.` on its own means ‘the current directory’; `..` means ‘the directory above the current one’.

--- 

<!--End of 1st hour-->


## PART 2 -- Working With Files and Directories

### 1. Creating directories
We now know how to explore files and directories, but how do we create them in the first place?

In this episode, we will learn about creating and moving files and directories, using the `exercise-data/writing` directory as an example.

First, let's check which directory we are in and move into `exercise-data/writing`:

```bash
$ pwd
/Users/nelle/Desktop/Practical1/shell-lesson-data
$ ls
exercise-data/      north-pacific-gyre/
$ cd exercise-data/writing/
```
Now, let's check what is inside the directory:

```bash
$ ls
LittleWomen.txt haiku.txt
```
Let’s create a new directory called thesis using the command mkdir thesis (which has no output):


```bash
$ mkdir thesis
```

`mkdir` means **m**a**k**e **dir**ectory. Since `thesis` is a relative path, the new directory is created in the current working directory:

```bash
$ ls
LittleWomen.txt haiku.txt       thesis/
```
Since we’ve just created the thesis directory, there’s nothing in it yet (check using `ls`)

	
> **How to name files/ directories**:
>
> no spaces, but can use `-` or `_`:
> 
> * ❌	`north pacific gyre` 
> * ✅ `north-pacific-gyre`
>			
> no strange symbols, such as `&` or `-`:
> 
> * ❌ 	`Peter & Mary`
> * ✅ `Peter_Mary`
>	
> with extensions, while not a must, these help identify file types:
> 
> * ❌ `mydocument`
> * ✅ `mydocument.txt`
	

### 2. Create a text file

Let’s change our working directory to `thesis` using command `cd`, then run a text editor called Nano to create a file called `draft.txt`:

```bash
$ cd thesis
$ nano draft.txt
```
Note that there are other text editors available. Nano and [Vi](https://www.vim.org/) are the two main text editors for editing plain text. They are light and will work directly on the terminal without the need for a graphical interface (which may not always be available on remote machines). Alternatively, you can use a basic GUI program called `gedit` or a little bit more advanced and more powerful `sublime` (may need to be installed).

Let's type in a couple of words using nano and save into the `draft.txt`

![nano-screenshot](nano-screenshot.png)

Once we’re happy with our text, we can press `Ctrl+O` (press the `Ctrl` or `Control` key and, while holding it down, press the `O` key) to write our data to disk. We will be asked to provide a name for the file that will contain our text. Press Return to accept the suggested default of `draft.txt`.

Once our file is saved, we can use `Ctrl+X` to quit the editor and return to the shell.

`nano` doesn’t leave any output on the screen after it exits, but `ls` now shows that we have created a file called `draft.txt`

```bash
$ ls
LittleWomen.txt draft.txt       haiku.txt       thesis/
```

There are other ways to create files; often, these will be generated as an output of a program we run. 


### 3. Moving files and directories

Make sure you are in the `shell-lesson-data/exercise-data/writing` directory, which you can do by using the absolute path or locate yourself in the directories and navigate up:

```bash 
$ cd ~/Desktop/Practical1/shell-lesson-data/exercise-data/writing
```

In our `thesis` directory we have a file `draft.txt` which isn’t a particularly informative name, so let’s change the file’s name using `mv`, which is short for **m**o**v**e:


```bash
$ mv thesis/draft.txt thesis/quotes.txt
```

The first argument tells `mv` _what_ we’re ‘moving’, while the second is _where_ it’s to go. In this case, we’re moving `thesis/draft.txt` to `thesis/quotes.txt`. Moving has the same effect as renaming the file. 

Sure enough, `ls` shows us that `thesis` now contains one file called `quotes.txt`:


```bash
$ ls thesis
quotes.txt
```

> ***WARNING*** ⚠️
> 
> Be careful when specifying the target file name since _`mv` will silently overwrite any existing file_ with the same name, which could lead to data loss. 
> 
> By default, `mv` will not ask for confirmation before overwriting files. However, an additional option, `mv -i` will cause `mv` to request such confirmation.

Note that `mv` also works on directories.

Let’s move `quotes.txt` into the current working directory. We use `mv` once again, but this time we’ll use just the name of a directory as the second argument to tell `mv` that we want to keep the filename but put it into a new place. In this case, the directory name we use is the special directory name `.`, which means the current directory.


```bash
$ mv thesis/quotes.txt .
```

If you try to explicitly list this file at its previous location:

```bash
$ ls thesis/quotes.txt
```

You will see:

```
ls: cannot access 'thesis/quotes.txt': No such file or directory
```


### 4. Copying files and directories


The `cp` command works very much like `mv`, except it **c**o**p**ies a file instead of moving it. We can check that it did the right thing using `ls` 

```bash
$ cp quotes.txt thesis/quotations.txt
$ ls quotes.txt
quotes.txt
$ ls thesis/quotations.txt
thesis/quotations.txt
```

We can also copy a directory and all its contents by using the recursive option `-r` (otherwise you will recieve an error `cp: -r not specified; omitting directory 'thesis'`). Lets back up our directory:

```bash
$ cp -r thesis thesis_backup
```

We can check using `ls` with two paths as arguments — like most Unix commands, `ls` can be given multiple paths at once:

```bash
$ ls thesis thesis_backup
```

```
thesis:
quotations.txt

thesis_backup:
quotations.txt
```


---
#### QUESTION 1

Suppose that you created a plain-text file in your current directory to contain a list of the statistical tests you will need to do to analyze your data, and named it `statstics.txt`

After creating and saving this file you realize you misspelled the filename! You want to correct the mistake, which of the following commands could you use to do so?

1. `cp statstics.txt statistics.txt`
2. `mv statstics.txt statistics.txt`
3. `mv statstics.txt .`
4. `cp statstics.txt .`


<details>
  <summary>**ANSWER 1**</summary>
  
1. No: While this would create a file with the correct name, the incorrectly named file still exists in the directory and would need to be deleted.
2. ✅: this would work to rename the file.
3. No, the period(.) indicates where to move the file, but does not provide a new file name; identical file names cannot be created.
4. No, the period(.) indicates where to copy the file, but does not provide a new file name; identical file names cannot be created.
</details>


#### QUESTION 2
 
What is the output of the closing ls command `in` the sequence shown below?

```bash
$ pwd
/Users/jamie/data
$ ls
proteins.dat
$ mkdir recombined
$ mv proteins.dat recombined/
$ cp recombined/proteins.dat ../proteins-saved.dat
$ ls
```

1. `proteins-saved.dat recombined`
2. `recombined`
3. `proteins.dat recombined`
4. `proteins-saved.dat`

<details>
  <summary>**ANSWER 2**</summary>
  
We start in the `/Users/jamie/data` directory, and create a new folder called `recombined`. The second line moves  the file `proteins.dat` to the new folder `recombined`. The third line makes a copy of the file we just moved. The tricky part here is where the file was copied to. Recall that `..` means ‘go up a level’, so the copied file is now in `/Users/jamie`. Notice that `..` is interpreted with respect to the current working directory, not with respect to the location of the file being copied. So, the only thing that will show using ls (in `/Users/jamie/data`) is the recombined folder.

1. No, see explanation above. `proteins-saved.dat` is located at `/Users/jamie`
2. ✅
3. No, see explanation above. `proteins.dat` is located at `/Users/jamie/data/recombined`
4. No, see explanation above. `proteins-saved.dat` is located at `/Users/jamie`
</details>

---


### 5. Removing files and directories


Returning to the `shell-lesson-data/exercise-data/writing` directory, let’s tidy up this directory by removing the `quotes.txt` file we created. The Unix command we’ll use for this is `rm` for **r**e**m**ove:

```bash
$ rm quotes.txt
```
Confirm it is gone:

```bash
$ ls quotes.txt
ls: cannot access 'quotes.txt': No such file or directory

```

> ***WARNING*** ⚠️
> 
> ```bash
> $ rm text.txt
> ```
> will remove the file completely from the machine (there is no Bin/Trash/...)
> 
> ```bash
> $ rm –i text.txt
>   rm: remove regular file ‘text.txt’? 
> ```
> prompts you to confirm by typing  `y`
> or cancel by typing  	`n`



If we try to remove the thesis directory using `rm thesis`, we get an error message:

```bash
$ rm thesis
rm: cannot remove 'thesis': Is a directory
```
This happens because rm by default only works on files, not directories.

`rm` can remove a directory and all its contents if we use the recursive option `-r`, and it will do so without any confirmation prompts:

```bash
$ rm -r thesis
```
Given that there is no way to retrieve files deleted using the shell, _`rm -r` should be used with great caution_ (consider adding the interactive option `rm -r -i`).


### 6. Operations with multiple files and directories 

Oftentimes one needs to copy or move several files at once. This can be done by providing a list of individual filenames, or specifying a naming pattern using *wildcards*. Wildcards are special characters that can be used to represent unknown characters or sets of characters when navigating the Unix file system.

`*` is a wildcard, which represents zero or more other characters. 
Let’s consider the `shell-lesson-data/exercise-data/alkanes` directory: 

* `*.pdb` represents `ethane.pdb`, `propane.pdb`, and every file that ends with ‘.pdb’. 
* `p*.pdb` only represents `pentane.pdb` and `propane.pdb`, because the `p` at the front can only represent filenames that begin with the letter ‘p’.

`?` is also a wildcard, but it represents exactly one character:

* `?ethane.pdb` could represent `methane.pdb`,
* `*ethane.pdb` represents both `ethane.pdb` and `methane.pdb`.

Wildcards can be used in combination with each other:

*  `???ane.pdb` indicates three characters followed by `ane.pdb`, giving `cubane.pdb ethane.pdb octane.pdb`.



---
#### TASK 1:

When run in the `alkanes` directory, which `ls` command(s) will produce this output?

```
ethane.pdb methane.pdb

```

1. `ls *t*ane.pdb`
2. `ls *t?ne.*`
3. `ls *t??ne.pdb`
4. `ls ethane.*`

<details>
  <summary>**SOLUTION 1:**</summary>
  
1. shows all files whose names contain zero or more characters (`*`) followed by the letter `t`, then zero or more characters (`*`) followed by `ane.pdb`. This gives `ethane.pdb methane.pdb octane.pdb pentane.pdb.`
2. shows all files whose names start with zero or more characters (`*`) followed by the letter `t`, then a single character (`?`), then `ne`. followed by zero or more characters (`*`). This will give us `octane.pdb` and `pentane.pdb` but doesn’t match anything which ends in `thane.pdb`.
3. ✅ fixes the problems of option  2  by matching two characters (`??`) between `t` and `ne`. 
4. only shows files starting with `ethane.`.
</details>


#### TASK 2:

Sam has a directory containing calibration data, datasets, and descriptions of the datasets:

```bash
.
├── 2015-10-23-calibration.txt
├── 2015-10-23-dataset1.txt
├── 2015-10-23-dataset2.txt
├── 2015-10-23-dataset_overview.txt
├── 2015-10-26-calibration.txt
├── 2015-10-26-dataset1.txt
├── 2015-10-26-dataset2.txt
├── 2015-10-26-dataset_overview.txt
├── 2015-11-23-calibration.txt
├── 2015-11-23-dataset1.txt
├── 2015-11-23-dataset2.txt
├── 2015-11-23-dataset_overview.txt
├── backup
│   ├── calibration
│   └── datasets
└── send_to_bob
    ├── all_datasets_created_on_a_23rd
    └── all_november_files

```

Before heading off to another field trip, she wants to back up her data and send some datasets to her colleague Bob. Sam uses the following commands to get the job done:


```bash
$ cp *dataset* backup/datasets
$ cp ____calibration____ backup/calibration
$ cp 2015-____-____ send_to_bob/all_november_files/
$ cp ____ send_to_bob/all_datasets_created_on_a_23rd/
```

Help Sam by filling in the blanks.

The resulting directory structure should look like this

```bash
.
├── 2015-10-23-calibration.txt
├── 2015-10-23-dataset1.txt
├── 2015-10-23-dataset2.txt
├── 2015-10-23-dataset_overview.txt
├── 2015-10-26-calibration.txt
├── 2015-10-26-dataset1.txt
├── 2015-10-26-dataset2.txt
├── 2015-10-26-dataset_overview.txt
├── 2015-11-23-calibration.txt
├── 2015-11-23-dataset1.txt
├── 2015-11-23-dataset2.txt
├── 2015-11-23-dataset_overview.txt
├── backup
│   ├── calibration
│   │   ├── 2015-10-23-calibration.txt
│   │   ├── 2015-10-26-calibration.txt
│   │   └── 2015-11-23-calibration.txt
│   └── datasets
│       ├── 2015-10-23-dataset1.txt
│       ├── 2015-10-23-dataset2.txt
│       ├── 2015-10-23-dataset_overview.txt
│       ├── 2015-10-26-dataset1.txt
│       ├── 2015-10-26-dataset2.txt
│       ├── 2015-10-26-dataset_overview.txt
│       ├── 2015-11-23-dataset1.txt
│       ├── 2015-11-23-dataset2.txt
│       └── 2015-11-23-dataset_overview.txt
└── send_to_bob
    ├── all_datasets_created_on_a_23rd
    │   ├── 2015-10-23-dataset1.txt
    │   ├── 2015-10-23-dataset2.txt
    │   ├── 2015-10-23-dataset_overview.txt
    │   ├── 2015-11-23-dataset1.txt
    │   ├── 2015-11-23-dataset2.txt
    │   └── 2015-11-23-dataset_overview.txt
    └── all_november_files
        ├── 2015-11-23-calibration.txt
        ├── 2015-11-23-dataset1.txt
        ├── 2015-11-23-dataset2.txt
        └── 2015-11-23-dataset_overview.txt
```


<details>
  <summary>**SOLUTION 2:**</summary>
  
```bash
$ cp *calibration.txt backup/calibration
$ cp 2015-11-* send_to_bob/all_november_files/
$ cp *-23-dataset* send_to_bob/all_datasets_created_on_a_23rd/
```
</details>



#### TASK 3:

Jamie is working on a project, and she sees that her files aren’t very well organized:

```bash
$ ls -F
analyzed/  fructose.dat    raw/   sucrose.dat
```

The `fructose.dat` and `sucrose.dat` files contain output from her data analysis. What command(s) covered in this lesson does she need to run so that the commands below will produce the output shown?

```bash
$ ls 
analyzed/   raw/
$ ls analyzed
fructose.dat    sucrose.dat
```


<details>
  <summary>**SOLUTION 3:**</summary>
  
```bash
mv *.dat analyzed
```

Jamie needs to move her files `fructose.dat` and `sucrose.dat` to the `analyzed` directory. The shell will expand `*.dat` to match all `.dat` files in the current directory. The `mv` command then moves the list of `.dat` files to the `analyzed` directory.

</details>


---
 
> ### KEY POINTS PART 2
> 
> * `cp [old] [new]` copies a file.
> * `mkdir [path]` creates a new directory.
> * `mv [old] [new]` moves (renames) a file or directory.
> * `rm [path]` removes (deletes) a file.
> * `*` matches zero or more characters in a filename, so `*.txt` matches all files ending in `.txt`.
> * `?` matches any single character in a filename, so `?.txt` matches `a.txt` but not `any.txt`.
> * The shell does not have a trash bin: _once something is deleted, it’s really gone_.
> * Most files’ names are `something.extension`. The extension isn’t required, and doesn’t guarantee anything, but is normally used to indicate the type of data in the file.
		

---

## PART 3 -- Pipes and Filters

### 1. Processing files 

Now that we know a few basic commands, we can finally look at the shell’s most powerful feature: the ease with which it lets us combine existing programs in new ways. 

We’ll start with the directory `shell-lesson-data/exercise-data/alkanes` that contains six files describing some simple organic molecules. The `.pdb` extension indicates that these files are in Protein Data Bank format, a simple text format that specifies the type and position of each atom in the molecule.


```bash
$ ls
cubane.pdb    methane.pdb    pentane.pdb
ethane.pdb    octane.pdb     propane.pdb

```

Let’s run an example command:

```bash
$ wc cubane.pdb
20  156 1158 cubane.pdb
```

`wc` is the **w**ord **c**ount command: it counts the number of lines, words, and characters in files (returning the values in that order from left to right).

If we run the command `wc *.pdb`, the `*` in `*.pdb` matches zero or more characters, so the shell turns `*.pdb` into a list of all `.pdb` files in the current directory:


```bash
$ wc *.pdb
  20  156  1158  cubane.pdb
  12  84   622   ethane.pdb
   9  57   422   methane.pdb
  30  246  1828  octane.pdb
  21  165  1226  pentane.pdb
  15  111  825   propane.pdb
 107  819  6081  total
```
 
Note that `wc *.pdb` also shows the total number of all lines in the last line of the output.

If we run `wc -l` instead of just `wc`, the output shows only the number of lines per file:

```bash
$ wc -l *.pdb
  20  cubane.pdb
  12  ethane.pdb
   9  methane.pdb
  30  octane.pdb
  21  pentane.pdb
  15  propane.pdb
 107  total
```

The `-m` and `-w` options can also be used with the wc command to show only the number of characters or the number of words, respectively.

What happens if a command is supposed to process a file, but we don’t give it a filename? For example, what if we type:

```bash
$ wc -l
```

but don’t type `*.pdb` (or anything else) after the command? Since it doesn’t have any filenames, `wc` assumes it is supposed to process input given at the command prompt, so it just sits there and waits for us to give it some data interactively. From the outside, though, all we see is it sitting there, and the command doesn’t appear to do anything.

If you make this kind of mistake, you can _escape out_ of this state by holding down the control key (`Ctrl`) and pressing the letter `C` once: `Ctrl+C`. Then release both keys.



### 2. Capturing output from commands 

Which of these files contains the fewest lines? It’s an easy question to answer when there are only six files, but what if there were 6000? Our first step toward a solution is to run the command:

```bash
$ wc -l *.pdb > lengths.txt
```

The greater than symbol, `>`, tells the shell to redirect the command’s output to a file instead of printing it to the screen. This command prints no screen output, because everything that `wc` would have printed has gone into the file `lengths.txt` instead. If the file doesn’t exist prior to issuing the command, the shell will create the file. If the file exists already, it will be silently overwritten, which may lead to data loss. Thus, redirect commands require caution.

`ls lengths.txt` confirms that the file exists.

We can now send the content of `lengths.txt` to the screen using `cat lengths.txt`. The `cat` command gets its name from con**cat**enate, i.e. join together, and it prints the contents of files one after another. There’s only one file in this case, so cat just shows us what it contains:

```bash
$ cat lengths.txt
  20  cubane.pdb
  12  ethane.pdb
   9  methane.pdb
  30  octane.pdb
  21  pentane.pdb
  15  propane.pdb
 107  total
```

### 3. Filtering output

Next we’ll use the sort command to sort the contents of the `lengths.txt` file. We will use the `-n` option to specify that the sort is numerical instead of alphanumerical. This does not change the file; instead, it sends the sorted result to the screen:

```bash
$ sort -n lengths.txt
  9  methane.pdb
 12  ethane.pdb
 15  propane.pdb
 20  cubane.pdb
 21  pentane.pdb
 30  octane.pdb
107  total
```

We can put the sorted list of lines in another temporary file called `sorted-lengths.txt` by putting `> sorted-lengths.txt` after the command, just as we used `> lengths.txt` to put the output of `wc` into `lengths.txt`. Once we’ve done that, we can check with the `cat` :

```bash
$ sort -n lengths.txt > sorted-lengths.txt
$ cat sorted-lengths.txt
  9  methane.pdb
 12  ethane.pdb
 15  propane.pdb
 20  cubane.pdb
 21  pentane.pdb
 30  octane.pdb
107  total
```

> **Other commands to preview the contents of the file:**
> 
> * `less lengths.txt` - displays a screenful of the file content and then stops. You can go forward one screenful by pressing the spacebar, or back one by pressing `b`. Press `q` to quit.
> * `head` coupled with `-n 5` will display only first 5 lines
> * `tail` same as `head`, coupled with `-n` will display only the given number of last lines (default is 10)

---

#### TASK 4: **WHAT DOES `>>` MEAN?**

We have seen the use of `>`, but there is a similar operator `>>` which works slightly differently. Learn about the differences between these two operators by printing some strings. We can use the echo command to print strings e.g.:

```bash
$ echo The echo command prints text
The echo command prints text
```

Now test the commands below to reveal the difference between the two operators:

```bash
$ echo hello > testfile01.txt
```

and:
```bash
$ echo hello >> testfile02.txt
```

**Hint**: Try executing each command twice in a row and then examining the output files.

<details>
  <summary>**SOLUTION 4:**</summary>
  
In the first example with `>`, the string ‘hello’ is written to `testfile01.txt`, but the file gets overwritten each time we run the command.

We see from the second example that the `>>` operator also writes ‘hello’ to a file (in this case `testfile02.txt`), but appends the string to the file if it already exists (i.e. when we run it for the second time).

</details>


#### TASK 5:

Consider the file `shell-lesson-data/exercise-data/animal-counts/animals.csv`. After these commands, select the answer that corresponds to the file `animals-subset.csv`:

```bash
$ head -n 3 animals.csv > animals-subset.csv
$ tail -n 2 animals.csv >> animals-subset.csv
```

1. The first three lines of `animals.csv`
2. The last two lines of `animals.csv`
3. The first three lines and the last two lines of `animals.csv`
4. The second and third lines of 	`animals.csv`


<details>
  <summary>**SOLUTION 5:**</summary>
  
Option 3 is correct. For option 1 to be correct, we would only run the `head` command. For option 2 to be correct, we would only run the `tail` command. For option 4 to be correct, we would have to pipe the output of `head` into `tail -n 2` by doing `head -n 3 animals.csv | tail -n 2 > animals-subset.csv`.
  
</details>

---

### 4. Combining multiple commands

To pass a command into the next command, we can use the symbol pipe (vertical bar), `|`,  between these two commands. 
It tells the shell that we want to use the output of the command on the left as the input to the command on the right. We can for example send the output of `wc` directly to `sort`:

```bash
$ wc -l *.pdb | sort -n
   9 methane.pdb
  12 ethane.pdb
  15 propane.pdb
  20 cubane.pdb
  21 pentane.pdb
  30 octane.pdb
 107 total
```

Nothing prevents us from chaining pipes consecutively. So, the output of `sort` can now be sent into `head`. This removes the need for any intermediate files.

```bash
$ wc -l *.pdb | sort -n | head -n 1
```

> **In summary:**
> 
> 
> ![redirects-and-pipes](redirects-and-pipes.svg)


---
#### TASK 6

In our current directory, we want to find the 3 files which have the least number of lines. Which command listed below would work?


1. `wc -l * > sort -n > head -n 3`
2. `wc -l * | sort -n | head -n 1-3`
3. `wc -l * | head -n 3 | sort -n`
4. `wc -l * | sort -n | head -n 3`

<details>
  <summary>**SOLUTION 6:**</summary>
  
Option 4 is the solution. The pipe character `|` is used to connect the output from one command to the input of another. `>` is used to redirect standard output to a file. Try it in the `shell-lesson-data/exercise-data/alkanes` directory!
</details>

#### TASK 7

A file called `animals.csv` (in the `shell-lesson-data/exercise-data/animal-counts` folder) contains the following data:

```
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,raccoon,7
2012-11-06,rabbit,19
2012-11-06,deer,2
2012-11-06,fox,4
2012-11-07,rabbit,16
2012-11-07,bear,1
```
What text passes through each of the pipes and the final redirect in the pipeline below? Note, the sort `-r` command sorts in reverse order.


```bash
$ cat animals.csv | head -n 5 | tail -n 3 | sort -r > final.txt
```

**Hint**: build the pipeline up one command at a time to test your understanding


<details>
  <summary>**SOLUTION 7:**</summary>
  
The `head` command extracts the first 5 lines from `animals.csv`. Then, the last 3 lines are extracted from the previous 5 by using the `tail` command. With the `sort -r` command those 3 lines are sorted in reverse order. Finally, the output is redirected to a file: `final.txt`. The content of this file can be checked by executing `cat final.txt`. The file should contain the following lines:

```
2012-11-06,rabbit,19
2012-11-06,deer,2
2012-11-05,raccoon,7
```

</details>


#### TASK 8
For the file `animals.csv` from the previous exercise, consider the following command:

```bash
$ cut -d , -f 2 animals.csv
```

The `cut` command is used to remove or **cut** out certain sections of each line in the file, and `cut` expects the lines to be separated into columns by a `Tab` character. A character used in this way is called a delimiter. In the example above we use the `-d` option to specify the comma as our delimiter character. We have also used the `-f` option to specify that we want to extract the second field (column). This gives the following output:

```
deer
rabbit
raccoon
rabbit
deer
fox
rabbit
bear
```

The `uniq` command filters out adjacent matching lines in a file. How could you extend this pipeline (using `uniq` and another command) to find out what animals the file contains (without any duplicates in their names)?

<details>
  <summary>**SOLUTION 8:**</summary>

```bash
$ cut -d , -f 2 animals.csv | sort | uniq
```

</details>


#### TASK 9

The file `animals.csv` contains 8 lines of data formatted as follows:

```
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,raccoon,7
2012-11-06,rabbit,19
...
```

The `uniq` command has a `-c` option which gives a count of the number of times a line occurs in its input. Assuming your current directory is `shell-lesson-data/exercise-data/animal-counts`, what command would you use to produce a table that shows the total count of each type of animal in the file?

1. `sort animals.csv | uniq -c`
2. `sort -t, -k2,2 animals.csv | uniq -c`
3. `cut -d, -f 2 animals.csv | uniq -c`
4. `cut -d, -f 2 animals.csv | sort | uniq -c`
5. `cut -d, -f 2 animals.csv | sort | uniq -c | wc -l`

<details>
  <summary>**QUESTION 3:**</summary>
  
Option 4. is the correct answer. If you have difficulty understanding why, try running the commands, or sub-sections of the pipelines (make sure you are in the `shell-lesson-data/exercise-data/animal-counts` directory).
</details>

---
#### Question 3 

Suppose you want to delete your processed data files, and only keep your raw files and processing script to save storage. The raw files end in `.dat` and the processed files end in `.txt`. Which of the following would remove all the processed data files, and only the processed data files?

1. `rm ?.txt`
2. `rm *.txt`
3. `rm * .txt`
4. `rm *.*`

<details>
  <summary>**ANSWER 3:**</summary>

1. This would remove `.txt` files with one-character names
2.  ✅ 
3. The shell would expand `*` to match everything in the current directory, so the command would try to remove all matched files and an additional file called `.txt`
1. The shell expands `*.*` to match all filenames containing at least one `.`, including the processed files (`.txt`) and raw files (`.dat`).
</details>

---

## Nelle’s Pipeline: Checking Files

Nelle has run her samples through the assay machines and created 17 files in the `north-pacific-gyre` directory described earlier. As a quick check, starting from the `shell-lesson-data directory`, Nelle types:

```bash
$ cd north-pacific-gyre
$ wc -l *.txt
```
The output is 18 lines that look like this:

```
300 NENE01729A.txt
300 NENE01729B.txt
300 NENE01736A.txt
300 NENE01751A.txt
300 NENE01751B.txt
300 NENE01812A.txt
... ...
```


Now she types this:

```bash
$ wc -l *.txt | sort -n | head -n 5
 240 NENE02018B.txt
 300 NENE01729A.txt
 300 NENE01729B.txt
 300 NENE01736A.txt
 300 NENE01751A.txt
```
 
Whoops: one of the files is 60 lines shorter than the others. When she goes back and checks it, she sees that she did that assay at 8:00 on a Monday morning — someone was probably in using the machine on the weekend, and she forgot to reset it. Before re-running that sample, she checks to see if any files have too much data:

```bash
$ wc -l *.txt | sort -n | tail -n 5
 300 NENE02040B.txt
 300 NENE02040Z.txt
 300 NENE02043A.txt
 300 NENE02043B.txt
5040 total
```

Those numbers look good — but what’s that ‘Z’ doing there in the third-to-last line? All of her samples should be marked ‘A’ or ‘B’; by convention, her lab uses ‘Z’ to indicate samples with missing information. To find others like it, she does this:

```bash
$ ls *Z.txt
NENE01971Z.txt    NENE02040Z.txt
```

Sure enough, when she checks the log on her laptop, there’s no depth recorded for either of those samples. Since it’s too late to get the information any other way, she must exclude those two files from her analysis. She could delete them using `rm`, but there are actually some analyses she might do later where depth doesn’t matter, so instead, she’ll have to be careful later on to select files using the wildcard expressions `NENE*A.txt` `NENE*B.txt`.

---
> ### KEY POINTS PART 3
> 
> * `wc` counts lines, words, and characters in its inputs.
> * `cat` displays the contents of its inputs.
> * `sort` sorts its inputs.
> * `head` displays the first 10 lines of its input.
> * `tail` displays the last 10 lines of its input.
> * command `> [file]` redirects a command’s output to a file (overwriting any existing content).
> * command `>> [file]` appends a command’s output to a file.
> * `[first] | [second]` is a pipeline: the output of the first command is used as the input to the second.
> * The best way to use the shell is to use pipes to combine simple single-purpose programs (filters).

---

## PART 4 -- Loops 

**This is an advanced topic and extra material**

Loops are a programming construct which allow us to repeat a command or set of commands for each item in a list. As such, they are key to productivity improvements through automation. Similar to wildcards and tab completion, using loops also reduces the amount of typing required (and hence reduces the number of typing mistakes).

Suppose we have several hundred genome data files named `basilisk.dat`, `minotaur.dat`, and `unicorn.dat`. For this example, we’ll use the `exercise-data/creatures` directory, which only has three example files, but the principles can be applied to many, many more files at once.

The structure of these files is the same: the common name, classification, and updated date are presented on the first three lines, with DNA sequences on the following lines. Let’s look at the files:

```bash
$ head -n 5 basilisk.dat minotaur.dat unicorn.dat
```

We would like to print out the classification for each species, which is given on the second line of each file. For each file, we would need to execute the command `head -n 2` and pipe this to `tail -n 1`. We’ll use a loop to solve this problem, but first, let’s look at the general form of a loop using the pseudo-code below:

```
# The word "for" indicates the start of a "For-loop" command
for thing in list_of_things 
#The word "do" indicates the start of job execution list
do 
    # Indentation within the loop is not required but aids legibility
    operation_using/command $thing 
# The word "done" indicates the end of a loop
done 
```
 
and we can apply this to our example like this:

```
$ for filename in basilisk.dat minotaur.dat unicorn.dat
> do
>     echo $filename
>     head -n 2 $filename | tail -n 1
> done
```
```
basilisk.dat
CLASSIFICATION: basiliscus vulgaris
minotaur.dat
CLASSIFICATION: bos hominus
unicorn.dat
CLASSIFICATION: equus monoceros
```

> The shell prompt changes from `$` to `>` and back again as we were typing in our loop. The second prompt, `>`, is different to remind us that we haven’t finished typing a complete command yet. A semicolon, `;`, can be used to separate two commands written on a single line.

When the shell sees the keyword `for`, it knows to repeat a command (or group of commands) once for each item in a list. Each time the loop runs (called an iteration), an item in the list is assigned in sequence to the *variable*, and the commands inside the loop are executed, before moving on to the next item in the list. Inside the loop, we call for the variable’s value by putting `$` in front of it. The `$` tells the shell interpreter to treat the variable as a variable name and substitute its value in its place, rather than treat it as text or an external command.

In this example, the list is three filenames: `basilisk.dat`, `minotaur.dat`, and `unicorn.dat`. Each time the loop iterates, we first use echo to print the value that the variable `$filename` currently holds. This is not necessary for the result, but beneficial for us here to have an easier time to follow along. Next, we will run the head command on the file currently referred to by `$filename`. The first time through the loop, `$filename` is `basilisk.dat`. The interpreter runs the command `head` on `basilisk.dat` and pipes the first two lines to the `tail` command, which then prints the second line of `basilisk.dat`. For the second iteration, `$filename` becomes `minotaur.dat`. This time, the shell runs `head` on `minotaur.dat` and pipes the first two lines to the `tail` command, which then prints the second line of `minotaur.dat`. For the third iteration, `$filename` becomes `unicorn.dat`, so the shell runs the `head` command on that file, and `tail` on the output of that. Since the list was only three items, the shell exits the for loop.

> Here we see `>` being used as a shell prompt, whereas `>` is also used to redirect output. Similarly, `$` is used as a shell prompt, but, as we saw earlier, it is also used to ask the shell to get the value of a variable.
> 
> If the shell prints `>` or `$` then it expects you to type something, and the symbol is a prompt.
> 
> If you type `>` or `$` yourself, it is an instruction from you that the shell should redirect output or get the value of a variable.


When using variables it is also possible to put the names into curly braces to clearly delimit the variable name: `$filename` is equivalent to `${filename}`, but is different from `${file}name`. You may find this notation in other people’s programs.

We have called the variable in this loop filename in order to make its purpose clearer to human readers. The shell itself doesn’t care what the variable is called; if we wrote this loop as:

```bash
$ for x in basilisk.dat minotaur.dat unicorn.dat
> do
>     head -n 2 $x | tail -n 1
> done
```
or:

```bash
$ for temperature in basilisk.dat minotaur.dat unicorn.dat
> do
>     head -n 2 $temperature | tail -n 1
> done
```

it would work exactly the same way. Don’t do this. Programs are only useful if people can understand them, so meaningless names (like `x`) or misleading names (like `temperature`) increase the odds that the program won’t do what its readers think it does.

In the above examples, the variables (`thing`, `filename`, `x` and `temperature`) could have been given any other name, as long as it is meaningful to both the person writing the code and the person reading it.

Note also that loops can be used for other things than filenames, like a list of numbers or a subset of data.

Let’s continue with our example in the `shell-lesson-data/exercise-data/creatures` directory. Here’s a slightly more complicated loop:

```
$ for filename in *.dat
> do
>     echo $filename
>     head -n 100 $filename | tail -n 20
> done
```

The shell starts by expanding `*.dat` to create the list of files it will process. The loop body then executes two commands for each of those files. The first command, echo, prints its command-line arguments to standard output. For example:

```BASH
$ echo hello there
```
prints:

```
hello there
```

In this case, since the shell expands `$filename` to be the name of a file, echo `$filename` prints the name of the file. Note that we can’t write this as:

```BASH
$ for filename in *.dat
> do
>     $filename
>     head -n 100 $filename | tail -n 20
> done
```
because then the first time through the loop, when `$filename` expanded to basilisk.dat, the shell would try to run `basilisk.dat` as a program. Finally, the head and tail combination selects lines 81-100 from whatever file is being processed (assuming the file has at least 100 lines).

We would like to modify each of the files in `shell-lesson-data/exercise-data/creatures`, but also save a version of the original files. We want to copy the original files to new files named `original-basilisk.dat` and `original-unicorn.dat`, for example. We can’t use:

```bash
$ cp *.dat original-*.dat
```

because that would expand to:

```
$ cp basilisk.dat minotaur.dat unicorn.dat original-*.dat
```

This wouldn’t back up our files, instead we get an error:

```
cp: target `original-*.dat' is not a directory
```

This problem arises when `cp` receives more than two inputs. When this happens, it expects the last input to be a directory where it can copy all the files it was passed. Since there is no directory named `original-*.dat` in the `creatures` directory, we get an error.

Instead, we can use a loop:

```bash
$ for filename in *.dat
> do
>     cp $filename original-$filename
> done
```

This loop runs the cp command once for each filename. The first time, when `$filename` expands to `basilisk.dat`, the shell executes:

```bash
cp basilisk.dat original-basilisk.dat
```

The second time, the command is:

```bash
cp minotaur.dat original-minotaur.dat
```

The third and last time, the command is:

```bash
cp unicorn.dat original-unicorn.dat
```

Since the `cp` command does not normally produce any output, it’s hard to check that the loop is working correctly. However, we learned earlier how to print strings using `echo`, and we can modify the loop to use `echo` to print our commands without actually executing them. As such, we can check what commands would be run in the unmodified loop.

The following diagram shows what happens when the modified loop is executed and demonstrates how the judicious use of echo is a good debugging technique.

![](shell_script_for_loop_flow_chart.svg)


----

## Nelle’s Pipeline: Processing Files


Nelle is now ready to process her data files using `goostats.sh` — a shell script written by her supervisor. This calculates some statistics from a protein sample file and takes two arguments:

1. an input file (containing the raw data)
2. an output file (to store the calculated statistics)


Since she’s still learning how to use the shell, she decides to build up the required commands in stages. Her first step is to make sure that she can select the right input files — remember, these are ones whose names end in ‘A’ or ‘B’, rather than ‘Z’. Moving to the `north-pacific-gyre` directory, Nelle types:

```bash
$ cd
$ cd Desktop/shell-lesson-data/north-pacific-gyre
$ for datafile in NENE*A.txt NENE*B.txt
> do
>     echo $datafile
> done
```

```
NENE01729A.txt
NENE01729B.txt
NENE01736A.txt
...
NENE02043A.txt
NENE02043B.txt
```

Her next step is to decide what to call the files that the `goostats.sh` analysis program will create. Prefixing each input file’s name with ‘stats’ seems simple, so she modifies her loop to do that:

```bash
$ for datafile in NENE*A.txt NENE*B.txt
> do
>     echo $datafile stats-$datafile
> done
```
```
NENE01729A.txt stats-NENE01729A.txt
NENE01729B.txt stats-NENE01729B.txt
NENE01736A.txt stats-NENE01736A.txt
...
NENE02043A.txt stats-NENE02043A.txt
NENE02043B.txt stats-NENE02043B.txt
```

She hasn’t actually run `goostats.sh` yet, but now she’s sure she can select the right files and generate the right output filenames.

Typing in commands over and over again is becoming tedious, though, and Nelle is worried about making mistakes, so instead of re-entering her loop, she presses `↑`. In response, the shell redisplays the whole loop on one line (using semi-colons to separate the pieces):

```bash
$ for datafile in NENE*A.txt NENE*B.txt; do echo $datafile stats-$datafile; done
```

Using the `←`, Nelle navigates to the echo command and changes it to bash `goostats.sh`:

```bash
$ for datafile in NENE*A.txt NENE*B.txt; do bash goostats.sh $datafile stats-$datafile; done
```

When she presses `Enter`, the shell runs the modified command. However, nothing appears to happen — there is no output. After a moment, Nelle realizes that since her script doesn’t print anything to the screen any longer, she has no idea whether it is running, much less how quickly. She kills the running command by typing `Ctrl+C`, uses `↑` to repeat the command, and edits it to read:

```
$ for datafile in NENE*A.txt NENE*B.txt; do echo $datafile;
bash goostats.sh $datafile stats-$datafile; done
```

> We can move to the beginning of a line in the shell by typing `Ctrl+A` and to the end using `Ctrl+`E.

When she runs her program now, it produces one line of output every five seconds or so:

```
NENE01729A.txt
NENE01729B.txt
NENE01736A.txt
...
```
1518 times 5 seconds, divided by 60, tells her that her script will take about two hours to run. As a final check, she opens another terminal window, goes into `north-pacific-gyre`, and uses `cat stats-NENE01729B.txt` to examine one of the output files. It looks good, so she decides to get some coffee and catch up on her reading.

Another way to repeat previous work is to use the `history` command to get a list of the last few hundred commands that have been executed, and then to use `!123` (where `123` is replaced by the command number) to repeat one of those commands. 

---
> ### KEY POINTS PART 4
> 
> * A for loop repeats commands once for every thing in a list.
> * Every for loop needs a variable to refer to the thing it is currently operating on.
> * Use `$name` to expand a variable (i.e., get its value). `${name}` can also be used.
> * Do not use spaces, quotes, or wildcard characters such as `*’` or `?` in filenames, as it complicates variable expansion.
> * Give files consistent names that are easy to match with wildcard patterns to make it easy to select them for looping.
> * Use the up-arrow key to scroll up through previous commands to edit and repeat them.
> * Use `Ctrl+R` to search through the previously entered commands.
> * Use `history` to display recent commands and `![number]` to repeat a command by number.> 

---
<!--End of 2nd hour-->



## PART 5 -- Shell Script

**This is an advanced topic and extra material**


We are finally ready to see what makes the shell such a powerful programming environment. We are going to take the commands we repeat frequently and save them in files so that we can re-run all those operations again later by typing a single command. For historical reasons, a bunch of commands saved in a file is usually called a *shell script*, but make no mistake — these are actually small programs.

Not only will writing shell scripts make your work faster, but also you won’t have to retype the same commands over and over again. It will also make it more accurate (fewer chances for typos) and more reproducible. If you come back to your work later (or if someone else finds your work and wants to build on it), you will be able to reproduce the same results simply by running your script, rather than having to remember or retype a long list of commands.


Let’s start by going back to alkanes/ and creating a new file, `middle.sh` which will become our shell script:

```bash
$ cd alkanes
$ nano middle.sh
```

The command `nano middle.sh` opens the file `middle.sh` within the text editor nano (which runs within the shell). If the file does not exist, it will be created. We can use the text editor to directly edit the file by inserting the following line:

```
head -n 15 octane.pdb | tail -n 5
```

This is a variation on the pipe we constructed earlier, which selects lines 11-15 of the file `octane.pdb`. Remember, we are not running it as a command just yet; we are only incorporating the commands in a file.

Then we save the file (`Ctrl-O` in nano) and exit the text editor (`Ctrl-X` in nano). Check that the directory alkanes now contains a file called `middle.sh`.

Once we have saved the file, we can ask the shell to execute the commands it contains. Our shell is called bash, so we run the following command:

```bash
$ bash middle.sh
ATOM      9  H           1      -4.502   0.681   0.785  1.00  0.00
ATOM     10  H           1      -5.254  -0.243  -0.537  1.00  0.00
ATOM     11  H           1      -4.357   1.252  -0.895  1.00  0.00
ATOM     12  H           1      -3.009  -0.741  -1.467  1.00  0.00
ATOM     13  H           1      -3.172  -1.337   0.206  1.00  0.00
```
Sure enough, our script’s output is exactly what we would get if we ran that pipeline directly.

What if we want to select lines from an arbitrary file? We could edit middle.sh each time to change the filename, but that would probably take longer than typing the command out again in the shell and executing it with a new file name. Instead, let’s edit `middle.sh` and make it more versatile:

```
$ nano middle.sh
```

Now, within “nano”, replace the text `octane.pdb` with the special variable called `$1`:

```
head -n 15 "$1" | tail -n 5
```

Inside a shell script, `$1` means ‘the first filename (or other argument) on the command line’. We can now run our script like this:

```
$ bash middle.sh octane.pdb
ATOM      9  H           1      -4.502   0.681   0.785  1.00  0.00
ATOM     10  H           1      -5.254  -0.243  -0.537  1.00  0.00
ATOM     11  H           1      -4.357   1.252  -0.895  1.00  0.00
ATOM     12  H           1      -3.009  -0.741  -1.467  1.00  0.00
ATOM     13  H           1      -3.172  -1.337   0.206  1.00  0.00
```

or on a different file like this:

```
$ bash middle.sh pentane.pdb
ATOM      9  H           1       1.324   0.350  -1.332  1.00  0.00
ATOM     10  H           1       1.271   1.378   0.122  1.00  0.00
ATOM     11  H           1      -0.074  -0.384   1.288  1.00  0.00
ATOM     12  H           1      -0.048  -1.362  -0.205  1.00  0.00
ATOM     13  H           1      -1.183   0.500  -1.412  1.00  0.00
```

For the same reason that we put the loop variable inside double-quotes, in case the filename happens to contain any spaces, we surround `$1` with double-quotes.

Currently, we need to edit `middle.sh` each time we want to adjust the range of lines that is returned. Let’s fix that by configuring our script to instead use three command-line arguments. After the first command-line argument (`$1`), each additional argument that we provide will be accessible via the special variables `$1`, `$2`, `$3`, which refer to the first, second, third command-line arguments, respectively.

Knowing this, we can use additional arguments to define the range of lines to be passed to head and tail respectively:

bash```
$ nano middle.sh
```
and edit to:
```
head -n "$2" "$1" | tail -n "$3"
```

We can now run:

```
$ bash middle.sh pentane.pdb 15 5
ATOM      9  H           1       1.324   0.350  -1.332  1.00  0.00
ATOM     10  H           1       1.271   1.378   0.122  1.00  0.00
ATOM     11  H           1      -0.074  -0.384   1.288  1.00  0.00
ATOM     12  H           1      -0.048  -1.362  -0.205  1.00  0.00
ATOM     13  H           1      -1.183   0.500  -1.412  1.00  0.00
```

By changing the arguments to our command, we can change our script’s behaviour:

```
$ bash middle.sh pentane.pdb 20 5
ATOM     14  H           1      -1.259   1.420   0.112  1.00  0.00
ATOM     15  H           1      -2.608  -0.407   1.130  1.00  0.00
ATOM     16  H           1      -2.540  -1.303  -0.404  1.00  0.00
ATOM     17  H           1      -3.393   0.254  -0.321  1.00  0.00
TER      18              1
```

This works, but it may take the next person who reads `middle.sh` a moment to figure out what it does. We can improve our script by adding some comments at the top:

```bash
$ nano middle.sh
```

and edit:

```
# Select lines from the middle of a file.
# Usage: bash middle.sh filename end_line num_lines
head -n "$2" "$1" | tail -n "$3"
```

A comment starts with a `#` character and runs to the end of the line. The computer ignores comments, but they’re invaluable for helping people (including your future self) understand and use scripts. The only caveat is that each time you modify the script, you should check that the comment is still accurate. An explanation that sends the reader in the wrong direction is worse than none at all.

What if we want to process many files in a single pipeline? For example, if we want to sort our .pdb files by length, we would type:

```bash
$ wc -l *.pdb | sort -n
```

because `wc -l` lists the number of lines in the files (recall that `wc` stands for ‘word count’, adding the `-l` option means ‘count lines’ instead) and `sort -n` sorts things numerically. We could put this in a file, but then it would only ever sort a list of `.pdb` files in the current directory. If we want to be able to get a sorted list of other kinds of files, we need a way to get all those names into the script. We can’t use `$1`, `$2`, and so on because we don’t know how many files there are. Instead, we use the special variable `$@`, which means, ‘All of the command-line arguments to the shell script’. We also should put `$@` inside double-quotes to handle the case of arguments containing spaces (`"$@"` is special syntax and is equivalent to `"$1" "$2" …`).


Here’s an example:

```bash
$ nano sorted.sh
```

edit to:

```bash
# Sort files by their length.
# Usage: bash sorted.sh one_or_more_filenames
wc -l "$@" | sort -n
```
and run:

```bash
$ bash sorted.sh *.pdb ../creatures/*.dat
9 methane.pdb
12 ethane.pdb
15 propane.pdb
20 cubane.pdb
21 pentane.pdb
30 octane.pdb
163 ../creatures/basilisk.dat
163 ../creatures/minotaur.dat
163 ../creatures/unicorn.dat
596 total
```


---

## Nelle’s Pipeline: Creating a Script


Nelle’s supervisor insisted that all her analytics must be reproducible. The easiest way to capture all the steps is in a script.

First, we return to Nelle’s project directory:

```bash
$ cd ../../north-pacific-gyre/
```
She creates a file using nano …

```bash
$ nano do-stats.sh
```
…which contains the following:

```
# Calculate stats for data files.
for datafile in "$@"
do
    echo $datafile
    bash goostats.sh $datafile stats-$datafile
done
```

She saves this in a file called `do-stats.sh` so that she can now re-do the first stage of her analysis by typing:

```bash
$ bash do-stats.sh NENE*A.txt NENE*B.txt
```
She can also do this:

```bash
$ bash do-stats.sh NENE*A.txt NENE*B.txt | wc -l
```
so that the output is just the number of files processed rather than the names of the files that were processed.

One thing to note about Nelle’s script is that it lets the person running it decide what files to process. She could have written it as:

```bash
# Calculate stats for Site A and Site B data files.
for datafile in NENE*A.txt NENE*B.txt
do
    echo $datafile
    bash goostats.sh $datafile stats-$datafile
done
```

The advantage is that this always selects the right files: she doesn’t have to remember to exclude the ‘Z’ files. The disadvantage is that it always selects just those files — she can’t run it on all files (including the ‘Z’ files), or on the ‘G’ or ‘H’ files her colleagues in Antarctica are producing, without editing the script. If she wanted to be more adventurous, she could modify her script to check for command-line arguments, and use `NENE*A.txt` `NENE*B.txt` if none were provided. Of course, this introduces another tradeoff between flexibility and complexity.


> ### KEY POINTS PART 5
> 
> * Save commands in files (usually called shell scripts) for re-use.
> * `bash [filename]` runs the commands saved in a file.
> * `$@` refers to all of a shell script’s command-line arguments.
> * `$1`, `$2`, etc., refer to the first command-line argument, the second command-line argument, etc.
> * Place variables in quotes if the values might have spaces in them.
> * Letting users decide what files to process is more flexible and more consistent with built-in Unix commands.


## PART 6 -- Finding things

**This is an advanced topic and extra material**

### 1. Searching within the file

In the same way that many of us now use ‘Google’ as a verb meaning ‘to find’, Unix programmers often use the word `grep`. `grep` is a contraction of **g**lobal/**r**egular **e**xpression/**p**rint’, a common sequence of operations in early Unix text editors. It is also the name of a very useful command-line program.

`grep` finds and prints lines in files that match a pattern. For our examples, we will use a file that contains three haiku taken from a [1998 competition](https://web.archive.org/web/19991201042211/http://salon.com/21st/chal/1998/01/26chal.html) in Salon magazine (Credit to authors Bill Torcaso, Howard Korder, and Margaret Segall, respectively). For this set of examples, we’re going to be working in the writing subdirectory:

```bash
$ cd
$ cd Desktop/shell-lesson-data/exercise-data/writing
$ cat haiku.txt


The Tao that is seen
Is not the true Tao, until
You bring fresh toner.

With searching comes loss
and the presence of absence:
"My Thesis" not found.

Yesterday it worked
Today it is not working
Software is like that.

```

Let’s find lines that contain the word ‘not’:

```
$ grep not haiku.txt

Is not the true Tao, until
"My Thesis" not found
Today it is not working
```

Here, not is the pattern we’re searching for. The grep command searches through the file, looking for matches to the pattern specified. To use it type `grep`, then the pattern we’re searching for and finally the name of the file (or files) we’re searching in.

The output is the three lines in the file that contain the letters ‘not’.

By default, grep searches for a pattern in a case-sensitive way. In addition, the search pattern we have selected does not have to form a complete word, as we will see in the next example.

Let’s search for the pattern: ‘The’.

```
$ grep The haiku.txt

The Tao that is seen
"My Thesis" not found.
```

This time, two lines that include the letters ‘The’ are outputted, one of which contained our search pattern within a larger word, ‘Thesis’.

To restrict matches to lines containing the word ‘The’ on its own, we can give `grep` the `-w` option. This will limit matches to word boundaries.

Later in this lesson, we will also see how we can change the search behavior of grep with respect to its case sensitivity.

```
$ grep -w The haiku.txt

The Tao that is seen
```

Note that a ‘word boundary’ includes the start and end of a line, so not just letters surrounded by spaces. Sometimes we don’t want to search for a single word, but a phrase. We can also do this with `grep` by putting the phrase in quotes.

```
$ grep -w "is not" haiku.txt

Today it is not working
```

We’ve now seen that you don’t have to have quotes around single words, but it is useful to use quotes when searching for multiple words. It also helps to make it easier to distinguish between the search term or phrase and the file being searched. We will use quotes in the remaining examples.

Another useful option is `-n`, which numbers the lines that match:

```
$ grep -n "it" haiku.txt

5:With searching comes loss
9:Yesterday it worked
10:Today it is not working
```

Here, we can see that lines 5, 9, and 10 contain the letters ‘it’.

We can combine options (i.e. flags) as we do with other Unix commands. For example, let’s find the lines that contain the word ‘the’. We can combine the option `-w` to find the lines that contain the word ‘the’ and `-n` to number the lines that match:

```
$ grep -n -w "the" haiku.txt

2:Is not the true Tao, until
6:and the presence of absence:
```

Now we want to use the option -i to make our search case-insensitive:

```
$ grep -n -w -i "the" haiku.txt

1:The Tao that is seen
2:Is not the true Tao, until
6:and the presence of absence:
```

Now, we want to use the option `-v` to invert our search, i.e., we want to output the lines that do not contain the word ‘the’.

```
$ grep -n -w -v "the" haiku.txt

1:The Tao that is seen
3:You bring fresh toner.
4:
5:With searching comes loss
7:"My Thesis" not found.
8:
9:Yesterday it worked
10:Today it is not working
11:Software is like that.
```

If we use the `-r` (recursive) option, grep can search for a pattern recursively through a set of files in subdirectories.

Let’s search recursively for Yesterday in the `shell-lesson-data/exercise-data/writing` directory:

```$ grep -r Yesterday .

./LittleWomen.txt:"Yesterday, when Aunt was asleep and I was trying to be as still as a
./LittleWomen.txt:Yesterday at dinner, when an Austrian officer stared at us and then
./LittleWomen.txt:Yesterday was a quiet day spent in teaching, sewing, and writing in my
./haiku.txt:Yesterday it worked
```

`grep` has lots of other options. To find out what they are, we can type:

```
$ grep --help
Usage: grep [OPTION]... PATTERN [FILE]...
Search for PATTERN in each FILE or standard input.
PATTERN is, by default, a basic regular expression (BRE).
Example: grep -i 'hello world' menu.h main.c

Regexp selection and interpretation:
  -E, --extended-regexp     PATTERN is an extended regular expression (ERE)
  -F, --fixed-strings       PATTERN is a set of newline-separated fixed strings
  -G, --basic-regexp        PATTERN is a basic regular expression (BRE)
  -P, --perl-regexp         PATTERN is a Perl regular expression
  -e, --regexp=PATTERN      use PATTERN for matching
  -f, --file=FILE           obtain PATTERN from FILE
  -i, --ignore-case         ignore case distinctions
  -w, --word-regexp         force PATTERN to match only whole words
  -x, --line-regexp         force PATTERN to match only whole lines
  -z, --null-data           a data line ends in 0 byte, not newline

Miscellaneous:
...        ...        ...
```


### 2. Finding the file

While grep finds lines in files, the find command finds files themselves. Again, it has a lot of options; to show how the simplest ones work, we’ll use the shell-lesson-data/exercise-data directory tree shown below.

```
.
├── animal-counts/
│   └── animals.csv
├── creatures/
│   ├── basilisk.dat
│   ├── minotaur.dat
│   └── unicorn.dat
├── numbers.txt
├── alkanes/
│   ├── cubane.pdb
│   ├── ethane.pdb
│   ├── methane.pdb
│   ├── octane.pdb
│   ├── pentane.pdb
│   └── propane.pdb
└── writing/
    ├── haiku.txt
    └── LittleWomen.txt
```
    
The exercise-data directory contains one file, `numbers.txt` and four directories: `animal-counts`, `creatures`, `alkanes` and `writing` containing various files.

For our first command, let’s run `find .` (remember to run this command from the `shell-lesson-data/exercise-data folder`).

```
$ find .

.
./writing
./writing/LittleWomen.txt
./writing/haiku.txt
./creatures
./creatures/basilisk.dat
./creatures/unicorn.dat
./creatures/minotaur.dat
./animal-counts
./animal-counts/animals.csv
./numbers.txt
./alkanes
./alkanes/ethane.pdb
./alkanes/propane.pdb
./alkanes/octane.pdb
./alkanes/pentane.pdb
./alkanes/methane.pdb
./alkanes/cubane.pdb
```

As always, the `.` on its own means the current working directory, which is where we want our search to start. find’s output is the names of every file and directory under the current working directory. This can seem useless at first but find has many options to filter the output and in this lesson we will discover some of them.

The first option in our list is `-type d` that means ‘things that are directories’. Sure enough, find’s output is the names of the five directories (including .):

```
$ find . -type d

.
./writing
./creatures
./animal-counts
./alkanes
```

Notice that the objects find finds are not listed in any particular order. If we change `-type d` to `-type f`, we get a listing of all the files instead:

```
$ find . -type f

./writing/LittleWomen.txt
./writing/haiku.txt
./creatures/basilisk.dat
./creatures/unicorn.dat
./creatures/minotaur.dat
./animal-counts/animals.csv
./numbers.txt
./alkanes/ethane.pdb
./alkanes/propane.pdb
./alkanes/octane.pdb
./alkanes/pentane.pdb
./alkanes/methane.pdb
./alkanes/cubane.pdb
```


Now let’s try matching by name:

```
$ find . -name *.txt

./numbers.txt
```
We expected it to find all the text files, but it only prints out `./numbers.txt`. The problem is that the shell expands wildcard characters like `*` before commands run. Since `*.txt` in the current directory expands to `./numbers.txt`, the command we actually ran was:

```
$ find . -name numbers.txt
```

find did what we asked; we just asked for the wrong thing.

To get what we want, let’s do what we did with `grep`: put `*.txt` in quotes to prevent the shell from expanding the `*` wildcard. This way, find actually gets the pattern `*.txt`, not the expanded filename `numbers.tx`t:

```
$ find . -name "*.txt"

./writing/LittleWomen.txt
./writing/haiku.txt
./numbers.txt
```

### 3. Combing the commands

As we said earlier, the command line’s power lies in combining tools. We’ve seen how to do that with pipes; let’s look at another technique. As we just saw, `find . -name "*.txt"` gives us a list of all text files in or below the current directory. How can we combine that with `wc -l` to count the lines in all those files?

The simplest way is to put the find command inside `$()`:

```
$ wc -l $(find . -name "*.txt")

  21022 ./writing/LittleWomen.txt
     11 ./writing/haiku.txt
      5 ./numbers.txt
  21038 total
```
  
When the shell executes this command, the first thing it does is run whatever is inside the `$()`. It then replaces the `$()` expression with that command’s output. Since the output of find is the three filenames `./writing/LittleWomen.txt`, `./writing/haiku.txt`, and `./numbers.txt`, the shell constructs the command:

```
$ wc -l ./writing/LittleWomen.txt ./writing/haiku.txt ./numbers.txt
```

which is what we wanted. This expansion is exactly what the shell does when it expands wildcards like `*` and `?`, but lets us use any command we want as our own ‘wildcard’.

It’s very common to use find and grep together. The first finds files that match a pattern; the second looks for lines inside those files that match another pattern. Here, for example, we can find txt files that contain the word “searching” by looking for the string ‘searching’ in all the `.txt` files in the current directory:

```
$ grep "searching" $(find . -name "*.txt")

./writing/LittleWomen.txt:sitting on the top step, affected to be searching for her book, but was
./writing/haiku.txt:With searching comes loss 
```

The Unix shell is older than most of the people who use it. It has survived so long because it is one of the most productive programming environments ever created — maybe even the most productive. Its syntax may be cryptic, but people who have mastered it can experiment with different commands interactively, then use what they have learned to automate their work. Graphical user interfaces may be easier to use at first, but once learned, the productivity in the shell is unbeatable. And as Alfred North Whitehead wrote in 1911, ‘Civilization advances by extending the number of important operations which we can perform without thinking about them.’

---
> ### KEY POINTS PART 5
> 
> * `find` finds files with specific properties that match patterns.
> * `grep` selects lines in files that match patterns.
> * `--help` is an option supported by many bash commands, and programs that can be run from within Bash, to display more information on how to use these commands or programs.
> * `man [command]` displays the manual page for a given command.
> * `$([command])` inserts a command’s output in place.

---



## PART 6 -- Using high performance computers

We have seen above how using a command-line interface instead of a GUI and creating scripts can save us valuable time running the analysis. Still, depending on the job we need to do, the time-limiting step can be the performance of our laptop/desktop. In this case, we need access to a more powerful machine. There are numerous large computers -- with shared computing resources -- available, from smaller machines in research groups to the University ones to national facilities.  

These resources on these machines usually have larger number and size of central processing units (CPUs), CPUs that operate at higher speeds, more memory, more storage, and faster connections with other computer systems. They are frequently called “clusters”, “supercomputers” or resources for “high performance computing” or HPC. In this lesson, we will usually use the terminology of HPC and HPC cluster.

Using a cluster often has the following advantages for researchers:

* **Speed**. With many more CPU cores, often with higher performance specs, than a typical laptop or desktop, HPC systems can offer significant speed up.
* **Volume**. Many HPC systems have both the processing memory (RAM) and disk storage to handle very large amounts of data. Terabytes of RAM and petabytes of storage are available for research projects.
* **Efficiency**. Many HPC systems operate a pool of resources that are drawn on by many users. In most cases, when the pool is large and diverse enough, the resources on the system are used almost constantly. This also means that the user can run jobs in parallel and a number of jobs simultaniously.
* **Cost**. Bulk purchasing and government funding mean that the cost to the research community for using these systems in significantly less that it would be otherwise.
* **Convenience**. Maybe your calculations just take a long time to run or are otherwise inconvenient to run on your personal computer. There’s no need to tie up your own computer for hours when you can use someone else’s instead.


University of Edinburgh has a supercomputer [Eddie](https://www.ed.ac.uk/information-services/research-support/research-computing/ecdf/high-performance-computing), which we will be using during this practical. Furthermore, UoE is a host to national supercomputing facilities [ARCHER2](https://www.archer2.ac.uk) and [Cirrus](https://www.cirrus.ac.uk), available to researchers in the UK.


In this session we will apply the bash skills we have learned earlier to connect to Eddie HPC. We will be using Eddie HPC in the following sessions to run our calculations.

### 1. Connecting to a remote machine

Connecting to an HPC system is most often done through a tool known as “SSH” (Secure SHell) and usually SSH is run through a terminal. So, to begin using an HPC system we need to begin by opening a terminal. 

Into the terminal, type without brackets:

```bash
ssh <YOUR UUN>@eddie.ecdf.ed.ac.uk
```
where `<YOUR UUN>` should be replaced with your personal user name, for example:

```
ssh s123456@eddie.ecdf.ed.ac.uk
```

The terminal will prompt you for the password, which is your university password. Note that there will be no spaces filling up when you are typing password in. When you are done, hit 'Enter'.

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

When you log into the machine you automatically land at your home directory. Check what it is by typing 

```bash
[nelle@login03(eddie) ~]$ pwd
```
which will show

```
/home/nelle
```
This space is small, default only 10 Gb, and can be used to store cluster configuration files/ job scripts and small amounts of persistent data. It is not suitable for the large files produced by the simulations. 

Instead, there is a large 2 Tb space, shared by all users of Eddie, where we will be running our simulations from. 

> ***WARNING*** ⚠️  *Files older than one month will be deleted from Scratch directory.*
> This is enough time for the duration of our course, but if you would like to keep your data, it will have to be moved onto your personal Datastore.


Let's explore that space:

```bash
[nelle@login03(eddie) ~]$ cd /exports/eddie/scratch/<UUN>
```

Replace `<UUN>` with your username, for Nelle her user name is `nelle` and therefore this is:

```bash
[nelle@login03(eddie) ~]$ cd /exports/eddie/scratch/nelle
```



<!--To make it easier to return to this space later, we can create a soft link in our home directory:
or may be we dont want this?
skipping
-->


Have you noticed that the prompt has changed? 
Instead of `~`, standing for 'home directory', it is now showing the directory you are currently in, i.e. `[nelle@login03(eddie) nelle]$`

In this directory, let's create a folder `Practical1` and descend into it:

```bash
[nelle@ç(eddie) nelle]$ mkdir Practical1
[nelle@login03(eddie) nelle]$ cd Practical1
[nelle@login03(eddie) Practical1]$ pwd
/exports/eddie/scratch/nelle/Practical1
```

Let's remember this location, as it will be the destination for the file transfers.


### 4. Transferring files to the remote machine

Secure copy

```
scp file <YOUR UUN>@eddie.ecdf.ed.ac.uk:/destination/directory/
```
transfer of a simple file (=shell script) across and run it


You should be prompted for your credentials after entering your password. 

To upload, you transfer from your local machine to the remote cluster:

`scp /home/user/file.txt $USER@$CLUSTER_NAME.shef.ac.uk:/home/$USER/`

To download, you transfer from the remote cluster to your local machine:

`scp $USER@$CLUSTER_NAME.shef.ac.uk:/home/$USER/file.txt /home/user/`

To copy a whole directory, we add the -r flag, for “recursive”

`scp -r $USER@$CLUSTER_NAME.shef.ac.uk:/home/$USER/my_results /home/user/`




### 5. Using the resources

The HPC has log-in nodes, which you see in your prompt as `login03`, and compute nodes.

The calculations are carried out on the compute nodes. There are different types of these nodes available, to cater for various needs. 

Therefore, the simulations should be performed on these compute nodes and NOT on the log-in ones. 

To run a job, you will need to submit a Grid Engine job submission script, that contains details of the program to run as well as requests for resources. 

You have just copied over an example job script `myjob.sh`. Let's examine it:

```
#!/bin/sh
# Grid Engine options (lines prefixed with #$)
#$ -N hello              
#$ -cwd                  
#$ -l h_rt=00:05:00 
#$ -l h_vmem=1G
#  These options are:
#  job name: -N
#  use the current working directory: -cwd
#  runtime limit of 5 minutes: -l h_rt
#  memory limit of 1 Gbyte: -l h_vmem
# Initialise the environment modules
. /etc/profile.d/modules.sh

# Load Python
module load python/3.4.3

# Run the program
python hello.py
```

You then submit this job script to the cluster with the `qsub` command.


submit a job

`qsub`

Since Eddie HPC is a shared resource, the jobs will queue. 

monitoring the job

`qstat`

cancelling the job

`qdel JobId`


The output of the job:

when job is running, two extra files will be created: `ooo` and `eee` which contain information from the HPC on the job.





### 7. Using modules 

Eddie HPC provides a number of [applications](https://www.wiki.ed.ac.uk/display/ResearchServices/Applications) = software to cater for various types of calculations that may be performed. 

Unlike on our personal machine, where all of the applications are always available to us, here the seer number of applications will make it very demanding to load up in one go for every user. Therefore, users will need to load the modules they need:

You can see what modules are available with the command:
```module available```
and you can make them available, by loading them::
```module load <MODULENAME/MODULEVERSION>```
For a list of currently loaded modules, run:
```module list```




### 8. Logging out

`exit`

jobs will continue to queue / run 






### Moving data to datastore?

Stagging  - i.e. data transfer to datastore?



<!--End of 3rd hour-->


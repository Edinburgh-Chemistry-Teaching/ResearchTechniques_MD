# PART 1 -- Navigating Files and Directories

👆[Go to the main menu](Session1.html) <br>
👉[Go to the next part -- Working With Files and Directories](Intro2BASH_S2.html)<br>



### 1. Open a terminal on your computer

Click on the terminal app at the bottom of the desktop:
![terminal](./img/terminal.png)

Which will open a window:
![commandline](./img/commandline.png)

Here, each line starts with the prompt `$` (can be another user-defined symbol). This is where you will be typing in the commands we give you, for example:

```bash
$ date
```

_**IMPORTANT**: do not type the prompt_`$`_when typing commands!_
Only type the command that follows the prompt. This rule applies both in these lessons and in lessons from other sources. 
After you type a command, you have to press the `ENTER` key to execute it.


The prompt is followed by a *text cursor*, a flashing [or solid black] cursor that indicates the position where your typing will appear.

Often, before the prompt symbol, there will be some information on the user, the machine, and even the directory currently in, for example on the imgure above:

```bash
[test@instance-test-2:~]$ 
```
Do not worry about all this; just make sure to type in only what is given after `$` into your terminal.
session1

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


Which will return the line, like:

```bash
/Users/nelle
```
Every time you type in `cd` without anything after the command, you will land in this location.


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

Now, continue into the directory `session1` you downloaded earlier.

First, go to the directory `Desktop`:

```bash
$ cd Desktop
```
Check the directories on the desktop:

```bash
$ ls
```

You should see the list, with one of them called `session1`. Now, go to that directory:

```bash
$ cd session1
```

We have now navigated from the *home directory* to the *current working directory*. 
 
 
> ### Let's have a look at how the file system is organised.
>  
> ![filesystem](./img/filesystem.svg)
>  
> The filesystem looks like an upside-down tree. The topmost directory is the *root directory* that holds everything else. We refer to it using a slash character, `/`, on its own; this character is the leading slash in `/Users/nelle`.
>  
> Inside that directory are several other directories: 
> 
> * `bin` (this is not the rubbish bin, but where  some built-in programs are stored), 
> * `data` (for miscellaneous data files), 
> * `Users` (where users’ personal directories are located), 
> * `tmp` (for temporary files that don’t need to be stored long-term).
>  
> We know that our current working directory `/Users/nelle` is stored inside `/Users` because `/Users` is the first part of its name. Similarly, we know that `/Users` is stored inside the root directory `/` because its name begins with `/`.
> 
> ![home-dirs](./img/home-directories.svg)
>  
> Underneath `/Users`, we find one directory for each user with an account on Nelle’s machine, her colleagues `imhotep` and `larry`.  
> Their files are stored in `/Users/Imhotep` and in `/Users/larry`, respectively.
> While Nelle’s are in `/Users/nelle`.
> 
> Nelle is the user in our examples here; therefore, we get `/Users/nelle` as our home directory. Typically, when you open a new command prompt, you will be in your home directory to start.


### 4. Exploring the contents of the directory

Not only can we use `ls` on the current working directory, but we can use it to list the contents of a different directory. 

Let’s take a look at the contents of the `session1` (our current directory) and the directory within it:

```bash
$ ls
```
that returns contents of current directory:

```bash
eddie-hpc-data/    shell-lesson-data/
```

and then list the contents of `shell-lesson-data`, without descending into the directory:

```bash
$ ls session1/shell-lesson-data
```

that returns:
```bash
exercise-data/      north-pacific-gyre/
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
/Users/nelle/Desktop/session1/shell-lesson-data/exercise-data
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
/Users/nelle/Desktop/session1/shell-lesson-data/north-pacific-gyre
$ cd /Users/nelle/Desktop/session1/shell-lesson-data
```
Remember, that the commands are after prompt `$` while the output of the terminal starts on a new line and has no prompt symbol in front.

The other way to indicate an absolute path, with respect to the current user’s home directory, is by using the tilde `~` character at the start of a path. For example, if Nelle’s home directory is `/Users/nelle`, then `~/data` is equivalent to `/Users/nelle/data`.
 
```bash
$ pwd
/Users/nelle/Desktop/session1/shell-lesson-data
$ cd ~/Desktop/session1/shell-lesson-data/exercise-data
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

![filesystem-challenge](./img/filesystem-challenge.svg)

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

👆[Go to the main menu](Session1.html) <br>
👉[Go to the next part -- Working With Files and Directories](Intro2BASH_S2.html)<br>


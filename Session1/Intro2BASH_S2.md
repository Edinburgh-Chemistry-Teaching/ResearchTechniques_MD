# PART 2 -- Working With Files and Directories

👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Navigating Files and Directories](Intro2BASH_S1.md)<br>
👉[Go to the next part -- Pipes and Filters](Intro2BASH_S3.md)


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
 
👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Navigating Files and Directories](Intro2BASH_S1.md)<br>
👉[Go to the next part -- Pipes and Filters](Intro2BASH_S3.md)

		


# PART 3 -- Pipes and Filters
👆[Go to the main menu](Session1.html) <br>
👈[Go to the previous part -- Working With Files and Directories](Intro2BASH_S2.html)<br>
👉[Go to the next part -- Loops](Intro2BASH_S4.html)



<span style="color:blue"> **This is an advanced topic and extra material** </span>.


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
> session1
> 
> ![redirects-and-pipes](./img/redirects-and-pipes.svg)


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
  <summary>**SOLUTION 9:**</summary>
  
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

👆[Go to the main menu](Session1.html) <br>
👈[Go to the previous part -- Working With Files and Directories](Intro2BASH_S2.html)<br>
👉[Go to the next part -- Loops](Intro2BASH_S4.html)

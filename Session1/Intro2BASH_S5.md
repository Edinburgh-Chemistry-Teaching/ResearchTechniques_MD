# PART 5 -- Shell Script

👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Loops](Intro2BASH_S4.md)<br>
👉[Go to the next part -- Finding things](Intro2BASH_S6.md)

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
---

👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Loops](Intro2BASH_S4.md)<br>
👉[Go to the next part -- Finding things](Intro2BASH_S6.md)

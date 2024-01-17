# PART 4 -- Loops 

👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Pipes and Filters](Intro2BASH_S3.md)<br>
👉[Go to the next part -- Shell Script](Intro2BASH_S5.md)

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

-----

👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Pipes and Filters](Intro2BASH_S3.md)<br>
👉[Go to the next part -- Shell Script](Intro2BASH_S5.md)

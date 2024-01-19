# PART 6 -- Finding things
👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Shell Script ](Intro2BASH_S5.md)<br>
👉[Go to the next part -- Using high-performance computers](Intro2BASH_S7.md)

<span style="color:blue"> **This is an advanced topic and extra material** </span>

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

```bash
$ grep not haiku.txt

Is not the true Tao, until
"My Thesis" not found
Today it is not working
```

Here, not is the pattern we’re searching for. The grep command searches through the file, looking for matches to the pattern specified. To use it type `grep`, then the pattern we’re searching for and finally, the name of the file (or files) we’re searching in.

The output is the three lines in the file that contain the letters ‘not’.

By default, grep searches for a pattern in a case-sensitive way. In addition, the search pattern we have selected does not have to form a complete word, as we will see in the next example.

Let’s search for the pattern: ‘The’.

```bash
$ grep The haiku.txt

The Tao that is seen
"My Thesis" not found.
```

This time, two lines that include the letters ‘The’ are outputted, one of which contained our search pattern within a larger word, ‘Thesis’.

To restrict matches to lines containing the word ‘The’ on its own, we can give `grep` the `-w` option. This will limit matches to word boundaries.

Later in this lesson, we will also see how we can change the search behavior of grep with respect to its case sensitivity.

```bash
$ grep -w The haiku.txt

The Tao that is seen
```

Note that a ‘word boundary’ includes the start and end of a line, so not just letters surrounded by spaces. Sometimes we don’t want to search for a single word, but a phrase. We can also do this with `grep` by putting the phrase in quotes.

```bash
$ grep -w "is not" haiku.txt

Today it is not working
```

We’ve now seen that you don’t have to have quotes around single words, but it is useful to use quotes when searching for multiple words. It also helps to make it easier to distinguish between the search term or phrase and the file being searched. We will use quotes in the remaining examples.

Another useful option is `-n`, which numbers the lines that match:

```bash
$ grep -n "it" haiku.txt

5:With searching comes loss
9:Yesterday it worked
10:Today it is not working
```

Here, we can see that lines 5, 9, and 10 contain the letters ‘it’.

We can combine options (i.e. flags) as we do with other Unix commands. For example, let’s find the lines that contain the word ‘the’. We can combine the option `-w` to find the lines that contain the word ‘the’ and `-n` to number the lines that match:

```bash
$ grep -n -w "the" haiku.txt

2:Is not the true Tao, until
6:and the presence of absence:
```

Now we want to use the option -i to make our search case-insensitive:

```bash
$ grep -n -w -i "the" haiku.txt

1:The Tao that is seen
2:Is not the true Tao, until
6:and the presence of absence:
```

Now, we want to use the option `-v` to invert our search, i.e., we want to output the lines that do not contain the word ‘the’.

```bash
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

```bash
$ grep -r Yesterday .

./LittleWomen.txt:"Yesterday, when Aunt was asleep and I was trying to be as still as a
./LittleWomen.txt:Yesterday at dinner, when an Austrian officer stared at us and then
./LittleWomen.txt:Yesterday was a quiet day spent in teaching, sewing, and writing in my
./haiku.txt:Yesterday it worked
```

`grep` has lots of other options. To find out what they are, we can type:

```bash
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


#### QUESTION 1

Which command would result in the following output:

```bash
and the presence of absence:
```

1. `grep "of" haiku.txt`
2. `grep -E "of" haiku.txt`
3. `grep -w "of" haiku.txt`
4. `grep -i "of" haiku.txt`


<details>
  <summary>**ANSWER 1**</summary>

The correct answer is 3, because the `-w` option looks only for whole-word matches. The other options will also match ‘of’ when part of another word.

</details>



#### TASK 1

Leah has several hundred data files saved in one directory, each of which is formatted like this:

```bash
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,raccoon,7
2012-11-06,rabbit,19
2012-11-06,deer,2
2012-11-06,fox,4
2012-11-07,rabbit,16
2012-11-07,bear,1
```

She wants to write a shell script that takes a species as the first command-line argument and a directory as the second argument. The script should return one file called `<species>.txt` containing a list of dates and the number of that species seen on each date. For example using the data shown above, `rabbit.txt` would contain:

```bash
2012-11-05,22
2012-11-06,19
2012-11-07,16
```

Below, each line contains an individual command, or pipe. Arrange their sequence in one command in order to achieve Leah’s goal:

```bash
cut -d : -f 2
>
|
grep -w $1 -r $2
|
$1.txt
cut -d , -f 1,3
```

**Hint**: use `man grep` to look for how to grep text recursively in a directory and `man cut` to select more than one field in a line.

An example of such a file is provided in `shell-lesson-data/exercise-data/animal-counts/animals.csv`

<details>
  <summary>**SOLUTION 1**</summary>
  
```bash
  grep -w $1 -r $2 | cut -d : -f 2 | cut -d , -f 1,3 > $1.txt

```
Actually, you can swap the order of the two cut commands and it still works. At the command line, try changing the order of the cut commands, and have a look at the output from each step to see why this is the case.

You would call the script above like this:

```bash
$ bash count-species.sh bear .
```

</details>



### 2. Finding the file

While grep finds lines in files, the find command finds files themselves. Again, it has a lot of options; to show how the simplest ones work, we’ll use the shell-lesson-data/exercise-data directory tree shown below.

```bash
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

```bash
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

```bash
$ find . -type d

.
./writing
./creatures
./animal-counts
./alkanes
```

Notice that the objects find finds are not listed in any particular order. If we change `-type d` to `-type f`, we get a listing of all the files instead:

```bash
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

```bash
$ find . -name *.txt

./numbers.txt
```
We expected it to find all the text files, but it only prints out `./numbers.txt`. The problem is that the shell expands wildcard characters like `*` before commands run. Since `*.txt` in the current directory expands to `./numbers.txt`, the command we actually ran was:

```bash
$ find . -name numbers.txt
```

find did what we asked; we just asked for the wrong thing.

To get what we want, let’s do what we did with `grep`: put `*.txt` in quotes to prevent the shell from expanding the `*` wildcard. This way, find actually gets the pattern `*.txt`, not the expanded filename `numbers.tx`t:

```bash
$ find . -name "*.txt"

./writing/LittleWomen.txt
./writing/haiku.txt
./numbers.txt
```

### 3. Combing the commands

As we said earlier, the command line’s power lies in combining tools. We’ve seen how to do that with pipes; let’s look at another technique. As we just saw, `find . -name "*.txt"` gives us a list of all text files in or below the current directory. How can we combine that with `wc -l` to count the lines in all those files?

The simplest way is to put the find command inside `$()`:

```bash
$ wc -l $(find . -name "*.txt")

  21022 ./writing/LittleWomen.txt
     11 ./writing/haiku.txt
      5 ./numbers.txt
  21038 total
```
  
When the shell executes this command, the first thing it does is run whatever is inside the `$()`. It then replaces the `$()` expression with that command’s output. Since the output of find is the three filenames `./writing/LittleWomen.txt`, `./writing/haiku.txt`, and `./numbers.txt`, the shell constructs the command:

```bash
$ wc -l ./writing/LittleWomen.txt ./writing/haiku.txt ./numbers.txt
```

which is what we wanted. This expansion is exactly what the shell does when it expands wildcards like `*` and `?`, but lets us use any command we want as our own ‘wildcard’.

It’s very common to use find and grep together. The first finds files that match a pattern; the second looks for lines inside those files that match another pattern. Here, for example, we can find txt files that contain the word “searching” by looking for the string ‘searching’ in all the `.txt` files in the current directory:

```bash
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


👆[Go to the main menu](Intro2BASH.md) <br>
👈[Go to the previous part -- Shell Script ](Intro2BASH_S5.md)<br>
👉[Go to the next part -- Using high-performance computers](Intro2BASH_S7.md)

# Computational Exercise

**Contact** 
Dr Valentina Erastova 

valentina.erastova@ed.ac.uk

Office B21 (Office hours Wedn 10.00-12.00 in weeks 3, 4 and 5)


**Demonstrators:**
Hannah Pollak, 
Audrey ..., 
..., ???
 

**Learning Outcomes:**

-	Understanding of the practical aspects of molecular simulations.
-	Basics of the command-line interface and usage high-performance computing resources.
-	Operating common computational chemistry packages to tackle real chemical problems.
-	Preparation of systems for molecular dynamics simulations and troubleshooting the set up, simulations and analysis steps.
-	Understanding of the limitations of the computational chemistry techniques used.
-	Reporting of the methodology and observations in a condensed written format.
-	Group working, encouraged and developed through the practicals.


**Overview:**

Computational techniques have become an integral part of the research, with their importance and contribution to scientific discovery growing rapidly in recent years. The use of computational techniques in chemistry has made it possible to simulate chemical reactions and predict the properties of molecules with a high degree of accuracy. Additionally, molecular simulations have made it possible to study complex systems that are difficult, if not impossible, to study experimentally, such as large protein complexes, biological membranes, interactions of molecules and materials at the interface, processes in space or in extreme conditions. These methods have had a positive impact on society by accelerating the development of new drugs, materials, and technologies. Therefore, it is essential for students to have a solid understanding of computational techniques and their applications in modern scientific methods. This part of the course, focuses on molecular dynamics simulations, one of the most commonly used methodologies in current research. 


**Content:**

Session 1: Introduction to Linux and command-line.

Session 2: Introduction to molecular dynamics simulations on a practical simulation of a protein.

Session 3: Molecular simulation set up of system with an interface.

Session 4: Beginning of the individual projects.


**Course organisation:**

Each session is 3 hours long; students are expected to carry out work independently after each session. 

**Drop-in** sessions with demonstrators are scheduled on Wedn **XXX** in weeks 3, 4 and 5.



**Assessment:**

An individual project (started during Session 4) is submitted in the form of a short, written report. 
Please see the Template Report (and marking scheme) prepared based on the material of Session 3.


**Use of AI tools:**

ChatGPT and other AI tools are ... [ref to uni things] - smth on declaration of use
Also, mention on the references and issues...


----


# Session 1: Intro to Linux

In this session, we will:

- learn what is Linux and why we use it 
- begin using shell
- learn about comp chem resources 
- [ TBC - overleaf/latex ]



## SHELL

**WHAT?**
Command line interface between YOU and UNIX (& its friends)

**WHY?**
Introduce some fundamental ideas of using computers:
						_repetitive tasks be gone!_

Things depend on it – supercomputers, installing programs, …

Gives you access to tools/resources



Summary of basic commands: https://swcarpentry.github.io/shell-novice/reference

Extra learning materials are found Software Carpentry:  https://swcarpentry.github.io





### How to name files/ directories

no spaces:
		❌	north pacific gyre 
		✅ 	north-pacific-gyre
			
no strange symbols:
	❌ 	Peter & Mary
	✅ 	Peter_Mary
	
with extensions:
		❌ 	mydocument
		✅ 	mydocument.txt
		
		
		
### WARNING ⚠️

```bash
$ rm text.txt
```
will remove the file completely from the machine (there is no Bin/Trash/...)

```bash
$ rm –i text.txt
  rm: remove regular file ‘text.txt’? 
```
prompts you to confirm by typing  `y`
or cancel by typing  	`n`



### Pipe & Loop 
Do we need this? 



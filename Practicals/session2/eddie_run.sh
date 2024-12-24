#!/bin/bash
# Name the job
#$ -N simulation_run

# Set the current working directory
#$ -cwd

# Request the gpu queue
#$ -q gpu

# Request one slot on the gpu-a100 parallel environment
#$ -pe gpu-a100 1

# Request 512 GB system RAM
# the total system RAM available to the job is the value specified here multiplied by  the number of requested GPUs (above)
#$ -l h_vmem=512G

# Combine standard output and error files into a single job file with job ID
#$ -j y

# Initialise the environment modules and load CUDA and Gromacs
. /etc/profile.d/modules.sh
module load gromacs/2024.4

# Add your commands here
gmx grompp # add your options here
gmx mdrun # add your options here

# End of script

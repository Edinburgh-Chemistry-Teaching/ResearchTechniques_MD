#!/bin/bash
# Name the job
#$ -N simulation_run

# Set the current working directory
#$ -cwd

# Request the gpu queue
#$ -q gpu

# Request one slot on the gpu-a100 parallel environment
#$ -pe gpu-a100 1

# Request 16 GB system RAM
# the total system RAM available to the job is the value specified here multiplied by  the number of requested GPUs (above)
#$ -l h_vmem=16G

# Combine standard output and error files into a single job file with job ID
#$ -j y

# Initialise the environment modules and load CUDA and Gromacs
. /etc/profile.d/modules.sh
module load cuda/12.1.1 phys/compilers/gcc/11.2.0
source /exports/applications/apps/SL7/gromacs/2023.3/gromacs_final/bin/GMXRC

# Add your commands here
gmx grompp # add your options here
gmx mdrun # add your options here

# End of script

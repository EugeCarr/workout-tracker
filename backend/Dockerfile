FROM --platform=linux/amd64 python:3.12 AS build
# PROJECT SETUP
# ----------------

# sets the working directory
WORKDIR /app

# copy these two files from <src> to <dest>
# <src> = current directory on host machine
# <dest> = filesystem of the container
COPY Pipfile Pipfile.lock ./

# install pipenv on the container
RUN pip install -U pipenv
# initialise the pipenv environment

# install project dependencies
RUN pipenv install --system

# copy all files and directories from <src> to <dest>
COPY . .


# RUN SERVER
# ------------
# expose the port
EXPOSE 8000

# Command to run
CMD ["python", "./WorkoutTracker/manage.py", "runserver", "0.0.0.0:8000"]
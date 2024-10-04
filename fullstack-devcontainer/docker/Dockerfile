FROM ubuntu:jammy

# set environment variables for tzdata
ARG TZ=America/New_York
ENV TZ=${TZ}

# include manual pages and documentation
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update &&\
  yes | unminimize

# install interactive programs (emacs, vim, nano, man, sudo, etc.)
RUN apt-get -y install\
 git\
 man\
 sudo\
 locales\
 clang-format\
 gdb\
 make\
 psmisc\
 nano\
 vim\
 dos2unix

# install dependencies for shell tests
RUN apt-get -y install\
 python3-pip\
 python3.10-venv\
 figlet\
 sysvbanner

RUN yes | pip install termcolor

RUN apt install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && \
  apt-get install -y nodejs

# set up default locale
RUN locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8

# remove unneeded .deb files
RUN rm -r /var/lib/apt/lists/*

# set up passwordless sudo for user fullstack-user
RUN useradd -m -s /bin/bash fullstack-user && \
  echo "fullstack-user ALL=(ALL:ALL) NOPASSWD: ALL" > /etc/sudoers.d/fullstack-init

# # create binary reporting version of dockerfile
# RUN (echo '#\!/bin/sh'; echo 'echo 1') > /usr/bin/fullstack-docker-version; chmod ugo+rx,u+w,go-w /usr/bin/fullstack-docker-version

# configure your environment
USER fullstack-user
RUN rm -f ~/.bash_logout

WORKDIR /home/fullstack-user
CMD ["/bin/bash", "-l"]
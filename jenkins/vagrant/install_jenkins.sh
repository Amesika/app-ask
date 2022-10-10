#!/bin/bash

# Install java
sudo apt update
sudo apt install openjdk-11-jre -y
java -version

sudo nano /etc/environment
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/"

# Install Maven
sudo apt-get install maven -y

# Install Jenkins
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

### https://www.jenkins.io/doc/book/installing/linux/
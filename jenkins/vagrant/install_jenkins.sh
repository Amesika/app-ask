#!/bin/bash

# Install java
sudo apt update
sudo apt install openjdk-11-jre
java -version

sudo nano /etc/environment
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/"

# Install Maven
sudo apt-get install maven -y

# Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins

### https://www.jenkins.io/doc/book/installing/linux/
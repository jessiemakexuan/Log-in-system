# Goal:
    Design a online chat system using AngularJS and redis. 
# Steps:
## 1.Deploy apache + php+redis+redis client 
      In your own VM, please input these command: 
        sudo apt-get update
        sudo apt-get install apache2
        sudo apt install php libapache2-mod-php
        sudo apt-get install -y php-pear
        sudo pear channel-discover pear.nrk.io
        sudo pear install nrk/Predis
        sudo apt-get install build-essential
        sudo apt-get install tcl8.5
        wget http://download.redis.io/releases/redis-stable.tar.gz
        tar xzf redis-stable.tar.gz
        cd redis-stable/
        make
        make test
        sudo make install
        cd utils
        sudo ./install_server.sh
        sudo service redis_6379 start
## 2.Enter /var/www/html, 
      sudo git clone https://github.com/jessiemakexuan/jessie.com.git
## 3.Add redis-master redis-slave behind 127.0.0.1  loaclhost in /etc/hosts
      127.0.0.1 localhost redis-master redis-slave
## 4.Run it through your VM's public IP
      http://public ip/jessie.com/


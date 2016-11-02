#Goal:
	Design and implement a hits counter for online chat website. Store, calculate and present the total hits in every specific time to data analyst for business analyze or show total hits number to our customer to let them know how popular our website is.

#Background:
	Before this mini project, we have designed an online chat website with log in & sign up page using AngularJS and implemented in the Google Cloud Platform. When our customers enter the main page of my website, because of the cookies, they can choose to log in directly or signup with a new account. All of these user information will be stored in Redis through php file. Besides, all of the files follow the MVC pattern, in this case, follow up modifies will become easier.

#Solution:
	There are many ways to implement this goal, one way is to use Redis function—INCR (INCR is a function that every time you enter with the same key, its value will increase by 1). So here we need to add case (incr) to “app.php” file and also revised “controller.js” file to add functions for hit counter to increase and get the number of hit per specific time. Besides we also need to revise “index.html” file for showing total hits to customer and create a new “counterhistory.html” file to let data analyst input specific time for checking and analyzing.

#How to add this application in your own VM:
##Step1:  Design an online chat system using AngularJS and redis.
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
##Step2: Enter your /var/www/html, clone all of my files in GitHub
	cd /var/www/html
	sudo git clone https://github.com/jessiemakexuan/jessie.com.git
##Step3: Add redis-master redis-slave behind 127.0.0.1  loaclhost in /etc/hosts
	127.0.0.1 localhost redis-master redis-slave
##Step4: Now it works, you can run it through your VM's public IP
	http://public ip/jessie.com/
	

#Results:
	Here is my main page: http://104.154.229.10/jessie.com/
	Here is my GitHub URL: https://github.com/jessiemakexuan/jessie.com
	Our customer will see this year’s total hits in the main page. It gives them a feeling that our website is very popular (If our website only has a little user, just delete this part in main page). For business analyst, they can click “More hits history” link or go to the counter history page directly through http://104.154.229.10/jessie.com/counterhistory.html . For example, they can enter every specific hour of a day such like 2016-11-02 10, gather all of the hit times data, draw a diagram to find the rush hour of a day. Use this useful data to modify the capacity.

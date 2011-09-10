OVERVIEW
========
This is a library to use mongodb for storing session data.
Compared with the other [connect-mongodb](https://github.com/masylum/connect-mongodb), 
this project is more messy but avoided a possible issue where if mongodb connection has not yet been established when "req.session" is used, things will break in 'connect-mongodb'


TODO
====
1. Add authenication support
2. Make the code more DRY
3. Try to publish on npm

OVERVIEW
========
This is a library to use mongodb for storing session data.  Compared with the other [connect-mongodb](https://github.com/masylum/connect-mongodb), this project is messier and a more "quick-and-dirty" solution before I realize there was this [connect-mongodb](https://github.com/masylum/connect-mongodb) project, but mine has avoided a possible issue where if mongodb connection has not yet been established when "req.session" is used, things will break in [connect-mongodb](https://github.com/masylum/connect-mongodb) 

TODO
----
1. Add authenication support
2. Make the code more DRY
3. Try to publish on npm
4. Add detailed comment
5. Fix "quick&dirty" way of query for production use

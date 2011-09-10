var mongodb = require('mongodb');
var Db = mongodb.Db,
    Connection = mongodb.Connection,
    Server = mongodb.Server;

var oneDay = 86400;

module.exports = function(connect){

    var Store = connect.session.Store;

    function MongoStore(options){
        options = options || {};
        Store.call(this, options);
        var host = options.host || 'localhost';
        var port = options.port || Connection.DEFAULT_PORT;
        var database = options.db || 'session_db';
        this.collection = options.collection || 'sessions';
        this.db = new Db(database, new Server(host, port, {}));
    };

    MongoStore.prototype.__proto__ = Store.prototype;

    MongoStore.prototype.get = function(sid, fn){
            try{
                var db = this.db;
                var collection = this.collection;
                this.db.open(function(err, database){
                    db.collection(collection, function(err, collection){
                        collection.findOne({'sid':sid}, function(err, doc){
                            if(!doc) return fn();
                            delete doc._id;
                            fn(null, doc);
                        });
                    });
                });
            } catch (err) {
                fn(err);
            }
    };

    MongoStore.prototype.set= function(sid, sess, fn){
        try{
            var maxAge = sess.cookie.maxAge
            , ttl = 'number' == typeof maxAge
            ? maxAge / 1000 | 0 : oneDay;
            sess.sid = sid;
            // remove all functions from sess
            sess = JSON.parse(JSON.stringify(sess));
            var db = this.db;
            var collection = this.collection;
            this.db.open(function(err,database){
                db.collection(collection, function(err, collection){
                    collection.insert(sess, function(err, docs){
                        fn && fn.apply(this, arguments);
                    });
                });
            });
        } catch (err) {
            fn && fn(err);
        }
    };

    MongoStore.prototype.destroy = function(sid, fn){
        var db = this.db;
        var collection = this.collection;
        this.db.open(function(err, database){
            db.collection(collection, function(err, collection){
                collection.remove({'sid':sid}, fn);
            });
        });
    };

    MongoStore.prototype.length = function(fn){
        var db = this.db;
        var collection = this.collection;
        this.db.open(function(err, database){
            db.collection(collection, function(err, collection){
                collection.count(fn)
            });
        });
    };
 
    MongoStore.prototype.clear = function(fn){
        var db = this.db;
        var collection = this.collection;
        this.db.open(function(err, database){
            db.collection(collection, function(err, collection){
                collection.remove(function(){
                    fn(null, true);
                });
            });
        });
    };

    return MongoStore;
}


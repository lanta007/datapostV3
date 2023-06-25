import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express  from 'express'
import bodyParser  from "body-parser";

var app3 = express()
app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({extended: true}))
var datapost = app3.listen(3002, console.log('server is running on port 3002'))

const firebaseConfig = {
    databaseURL: "https://realtime-test2-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

//create datapost
app3.post('/api/CreateDataPost', (req, res) => {  
    var userID = req.body.userID;
    var content = req.body.content;
    var date = req.body.date;
    var img = req.body.img;
    var list = req.body.list;
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var username = req.body.username;
    var like = req.body.like;
    var tag = reg.body.tag;
//ประกาศว่าจะเก็บข้อมูลอะไรบ้าง


    try {
        console.log('>>>> userID', userID);
        console.log('>>>> content', content);
        console.log('>>>> date', date);
        console.log('>>>> img', img);
        console.log('>>>> list', list);
        console.log('>>>> postID', postID);
        console.log('>>>> thumbURL', thumbURL);
        console.log('>>>> title', title);
        console.log('>>>> username', username);
        console.log('>>>> username', like);
        console.log('>>>> username', tag);

        console.log('path','datapost/'+userID,content,date,
        img,list,postID,thumbURL,title,username,like.tag)

        set(ref(db, 'datapost/' + postID), {
            userID: userID,
            content: content,
            date: new Date()+ '',//เป็นการประกาศ ว/ด/ป 
            img: img,
            list: list,
            postID: postID,
            thumbURL: thumbURL,
            title: title,
            username: username,
            like: like,
            tag: tag
        });
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Post created successfully.'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});


//get
app3.get('/api/GetDataPost', (req, res) => {
    try {
        get(ref(db, 'datapost'))
            .then((snapshot) => {
                console.log(snapshot.val());
                if (snapshot.exists()) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                        Result: snapshot.val()
                    });
                } else {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'bad',
                        Result: 'No data found'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: err.message
                });
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});

//get by users
app3.post('/api/GetDataPostByUsers', (req, res) => {
    var userID = req.body.userID;
    var content = req.body.content;
    var date = req.body.date;
    var img = req.body.img;
    var list = req.body.list;
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var username = req.body.username;
    var like = req.body.like;
    var tag = reg.body.tag;

    try{
        get(ref(db,'datapost/' + postID))
        .then((snapshot) => {
            console.log(snapshot.val())
            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'bad',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})


//update
app3.put('/api/UpdateDatapost', (req, res) => {
    var userID = req.body.userID;
    var content = req.body.content;
    var date = req.body.date;
    var img = req.body.img;
    var list = req.body.list;
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var username = req.body.username;
    var like = req.body.like;
    var tag = reg.body.tag;

    try {
        var updates = {};
        updates[`posts/${postID}/userID`] = userID;
        updates[`posts/${postID}/content`] = content;
        updates[`posts/${postID}/date`] = date;
        updates[`posts/${postID}/img`] = img;
        updates[`posts/${postID}/list`] = list;
        updates[`posts/${postID}/thumbURL`] = thumbURL;
        updates[`posts/${postID}/title`] = title;
        updates[`posts/${postID}/username`] = username;
        updates[`posts/${postID}/like`] = like;
        updates[`posts/${postID}/tag`] = tag;


        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good'
            });
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad ' + err2.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});

//delete
app3.delete('/api/DeleteDataPost', (req, res) => {
    var userID = req.body.userID;
    var content = req.body.content;
    var date = req.body.date;
    var img = req.body.img;
    var list = req.body.list;
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var username = req.body.username;
    var like = req.body.like;
    var tag = reg.body.tag;

    try {
        var updates = {};
        updates[`posts/${postID}/userID`] = userID;
        updates[`posts/${postID}/content`] = content;
        updates[`posts/${postID}/date`] = date;
        updates[`posts/${postID}/img`] = img;
        updates[`posts/${postID}/list`] = list;
        updates[`posts/${postID}/thumbURL`] = thumbURL;
        updates[`posts/${postID}/title`] = title;
        updates[`posts/${postID}/username`] = username;
        updates[`posts/${postID}/like`] = like;
        updates[`posts/${postID}/tag`] = tag;


        remove(ref(db, `datapost/${userID}`))
        .then(() => {
            update(ref(db), updates)
            .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good'
                });
            })
            .catch((err2) => {
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: 'bad ' + err2.message
                });
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});


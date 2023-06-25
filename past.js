import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express  from 'express';
import bodyParser  from "body-parser";
import cors from 'cors';

var app3 = express()
app3.use(cors());
app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({extended: true}))
var datapost = app3.listen(3001, console.log('server is running on port 3001'))

const firebaseConfig = {
    databaseURL: "https://nosql-test-25b1d-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const propertyNames = Object.keys(app3.post);
const propertyValues = Object.values(app3.post);
const entries = Object.entries(app3.post);

//create datapost
app3.post('/api/CreateDataPost', (req, res) => {  
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var UserID = req.body.UserID;
    var date = req.body.date;
    var content = req.body.content;
    var list1 = req.body.list1;
    var list2 = req.body.list2;
    var list3 = req.body.list3;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var like = req.body.like;
    var tag = req.body.tag;

    try {
        console.log('UserID', UserID);
        console.log('content', content);
        console.log('date', date);
        console.log('img1', img1);
        console.log('img2', img2);
        console.log('img3', img3);
        console.log('list1', list1);
        console.log('list2', list2);
        console.log('list3', list3);
        console.log('postID', postID);
        console.log('thumbURL', thumbURL);
        console.log('title', title);
        console.log('like', like);
        console.log('tag', tag);

        console.log('path','datapost/'+ UserID+content+date+
        img1+img2+img3+list1+list2+list3+postID+thumbURL+title+like+tag)

        set(ref(db,'datapost/'+UserID+"postID"+postID ),[
            {
               "UserID":UserID,
               "content":content,
               "date":new Date()+'',
               "img1": img1,
               "img2": img2,
              "img3": img3,
              "list1": list1,
              "list2": list2,
              "list3": list3,
              "postID": postID, 
              "thumbURL": thumbURL, //ประกาศเป็น string
              "title": title, //ประกาศเป็น string
              "like": like,
              "tag": tag
        }]
        );
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


app3.get('/api/get', (req, res) => {
    try {
        get(ref(db,'datapost'))
        .then((snapshot) => {
            console.log(snapshot.val())
            console.log(propertyNames);
            console.log(propertyValues);
            console.log(entries);
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
                    RespMessage: 'good',
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
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var UserID = req.body.UserID;
    var date = req.body.date;
    var content = req.body.content;
    var list1 = req.body.list1;
    var list2 = req.body.list2;
    var list3 = req.body.list3;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var like = req.body.like;
    var tag = req.body.tag;

    try {
        var updates = {};
        updates[`posts/${postID}/UserID`] = UserID;
        updates[`posts/${postID}/content`] = content;
        updates[`posts/${postID}/date`] = date;
        updates[`posts/${postID}/img1`] = img1;
        updates[`posts/${postID}/img2`] = img2;
        updates[`posts/${postID}/img3`] = img3;
        updates[`posts/${postID}/list1`] = list1;
        updates[`posts/${postID}/list2`] = list2;
        updates[`posts/${postID}/list3`] = list3;
        updates[`posts/${postID}/thumbURL`] = thumbURL;
        updates[`posts/${postID}/title`] = title;
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
    var postID = req.body.postID;
    var thumbURL = req.body.thumbURL;
    var title = req.body.title;
    var UserID = req.body.UserID;
    var date = req.body.date;
    var content = req.body.content;
    var list1 = req.body.list1;
    var list2 = req.body.list2;
    var list3 = req.body.list3;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var like = req.body.like;
    var tag = req.body.tag;

    try {
        var updates = {};
        updates[`posts/${postID}/UserID`] = UserID;
        updates[`posts/${postID}/content`] = content;
        updates[`posts/${postID}/date`] = date;
        updates[`posts/${postID}/img1`] = img1;
        updates[`posts/${postID}/img2`] = img2;
        updates[`posts/${postID}/img3`] = img3;
        updates[`posts/${postID}/list1`] = list1;
        updates[`posts/${postID}/list2`] = list2;
        updates[`posts/${postID}/list3`] = list3;
        updates[`posts/${postID}/thumbURL`] = thumbURL;
        updates[`posts/${postID}/title`] = title;
        updates[`posts/${postID}/like`] = like;
        updates[`posts/${postID}/tag`] = tag;

        remove(ref(db, `datapost/${UserID}`))
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

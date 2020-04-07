const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

app.use(express.static('../client'));  //server client side on same server

const db = monk('localhost/meower');

const mews = db.get('mews');

app.use(cors()); //to accept requests from static files
app.use(express.json()); //to parse data received

app.get('/', (req, res) => {
    res.json({
        message: 'Meower brah brah!'
    });
});

app.get('/mews', (req, res) => {
    mews.find().then(ar => res.json(ar));
});

function isvalidmew(mew) {
    return mew.name && mew.name.toString().trim() !== '' &&
        mew.mew && mew.mew.toString().trim() !== '';
}

app.post('/mews', (req, res) => {
    if (isvalidmew(req.body)) {
        const data = {
            name: req.body.name.toString(),
            content: req.body.mew.toString(),
            created: new Date()
        };
        mews
            .insert(data)
            .then(createdMew => {
                res.json(createdMew);
            });
    } else {
        res.status(422);
        res.json({
            message: 'Hey ! Name and Contents are required !'
        });
    }
});

app.listen(5000, () => {
    console.log("listening on port 5000")
});

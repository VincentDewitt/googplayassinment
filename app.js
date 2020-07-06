const express = require('express');
const playstore = require('./playstore');

const app = express();

app.get('/apps', (req,res) => {
    const { sort = "app"} = req.query;
    const { genres = "Action"} = req.query;
    console.log(req.headers);
    
    let results = playstore
    .filter(playstore =>
            playstore
            .Genres
            .toLowerCase()
            .includes(genres.toLowerCase()));


    if(sort){
        if(!['App','Rating'].includes(sort)){
            return res
            .status(400)
            .send('Sort must be done with app name or rating')
        }

    }
    if (sort) {
        results.sort((a,b) => {
            return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
        });
    }
console.log(req.query);

        res
        .json(results);
});
app.listen(8000,() => {
    console.log('googleplay server started');
});
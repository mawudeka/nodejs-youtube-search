const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public/`));
app.use(bodyParser.urlencoded({ extended: true }));

const APIKEY = 'AIzaSyAmunb08OB1rWWw9tx0mBisdfuTDVmRCM0';
let video = [];
app.get('/', (req, res) => {
	res.render('index', { videos: video });
});

app.post('/', async (req, res) => {
	const word = req.body.search;
	const url = `https://www.googleapis.com/youtube/v3/search?q=${word}&key=${APIKEY}&maxResults=12&part=snippet`;
	video = [];
	const response = await fetch(url);
	const apiData = await response.json();
	apiData.items.forEach((element) => {
		const videoData = {
			id: element.id.videoId,
			title: element.snippet.title,
			description: element.snippet.description,
		};

		video.push(videoData);
	});

	res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening on port 3000');
});

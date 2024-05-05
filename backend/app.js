const express = require('express');
const utils = require("./utils");
const app = express();

var users = null;

app.get('/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.json(users)
});

app.listen(3000, function () {
	console.log("listening on port 3000");
	utils.getUsers(130, (receivedUsers) => {
		receivedUsers = utils.trimUnusedData(receivedUsers);
		users = receivedUsers;
		console.log("obtained all users");
	});
});

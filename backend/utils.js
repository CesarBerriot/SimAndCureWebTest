const https = require('https');

module.exports = {
	getUsers: function(amount, callback) {
		let receivedJsonData = "";
		
		const options = {
			hostname: "randomuser.me",
			path: "/api/?results=" + amount,
			method: "GET",
		}
		
		const request = https.request(options, (response) => {
			response.setEncoding("utf8");
			
			response.on("data", (chunk) => {
				receivedJsonData += chunk;
			});
			
			response.on("end", () => {
				let userObjects = JSON.parse(receivedJsonData);
				callback(userObjects);
			});
		});
		
		request.on("error", (error) => {
			console.error(error);
			process.exit(1);
		});
		
		request.end();
	},
	trimUnusedData: function(users) {
		let result = { userList: [] };
		
		for(i = 0; i < users.results.length; ++i) {
			let originalUser = users.results[i];
			let newUser = {
				name: originalUser.name,
				gender: originalUser.gender,
				age: originalUser.dob.age,
				phone: originalUser.phone,
				email: originalUser.email,
				location: {
					country: originalUser.location.country,
					state: originalUser.location.state,
					city: originalUser.location.city,
				},
				pictures: originalUser.picture,
			};
			result.userList.push(newUser);
		}
		
		return result;
	},
}
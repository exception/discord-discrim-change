const request = require("request")

let arguments = process.argv.slice(2) // removes "npm start"
if (arguments.length !== 5) {
    console.log("Usage: node app.js <token> <user> <email> <password> <desired discriminator>")
} else {
    const token = arguments[0]
    const user = arguments[1]
    const email = arguments[2]
    const password = arguments[3]
    const discrim = arguments[4]

    console.log("Got all necessary information, generating payload...")

    // Construct Payload
    let payload = {
        "username": user, 
	    "email": email,
	    "password": password, 
	    "discriminator": discrim, 
	    "new_password": null
    }

    // Options defines what request needs to perform the PATCH
    let options = {
        url: "https://canary.discordapp.com/api/v7/users/@me",
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        json: payload
    }

    // Finished up constructing payload, print it.
    console.log("Payload: %s", JSON.stringify(options, null, 4))
    console.log("Sending payload to Discord API...")

    // Send the payload,
    request(options, (err, response, body) => {
        if (!err) {
            // doesn't return any status codes is succesful.
            console.log(JSON.stringify(body, null, 4))
        } else {
            // something broke, print it,
            console.error(err)
            console.error(JSON.stringify(body, null, 4))
        }
    })
}

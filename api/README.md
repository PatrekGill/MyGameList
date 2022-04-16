# Apollo GraphQL API

The API uses the `apollo-server-cloud-functions` package to create and deploy the server on firebase. I also used just `apollo-server` to make a simpler local using a `node` command rather then firebase emulation to start. **Both**  of these are the 3.0 version which is part of the problem, as many tutorials seemed to be on 2.0/using javascript.

- [Apollo Google Cloud Functions Deployment](https://www.apollographql.com/docs/apollo-server/deployment/gcp-functions)
- [Running Apollo Server on Firebase Cloud Functions](https://medium.com/@piuccio/running-apollo-server-on-firebase-cloud-functions-265849e9f5b8)
- [GraphQL with Apollo Server 2.0 (YouTube)](https://www.youtube.com/watch?v=8D9XnnjFGMs&t=312s)
	- [Github For The Above Video](https://github.com/arjunyel/firestore-apollo-graphql)
- [Migrating To Apollo 3.0](https://www.apollographql.com/docs/apollo-server/migration)

<br>

---

<br>

#### Install
```
# navigate to functions folder
cd api/functions

# install depdencies
npm install
```

#### Run Locally
```
# navigate to functions folder
cd api/functions

# build typescript files
npm run build

# run local-server.js
node lib/local-server.js
```

#### Deploy
```
# navigate to api folder
cd api

# deploy to cloud
firebase deploy
```

<br>

- - - 

<br>

## Notes
- The [index.ts](https://github.com/PatrekGill/MyGameList/blob/main/api/functions/src/index.ts) is where the firebase server will deploy from.
- Steps to start this shell:
	- Created folder for shell ("`api`" in this case)
	- After installing the [Firebase CLI tools using npm](https://firebase.google.com/docs/cli), login to Firebase (`firebase login`), and finally initialize a fire base project while inside the your "`api`" folder using `firebase init`.
		- The only particualr thing here is to select the `Functions` package for Firebase
	- Once installed, `cd` into the functions folder and install the apollo and graphql packages
```
	# Go to functions folder
	cd functions

	# apollo-server-cloud-functions are Google Cloud functions for apollo that also work with Firebase
	npm install apollo-server-cloud-functions graphql @graphql/tools-schema 

	# Only if you intend to use something like the local-server.ts file do you need the actual apollo-server package
	npm install apollo-server
```

# Apollo GraphQL API

The API uses the `apollo-server-cloud-functions` package to create and deploy the server on firebase/locally. The api was pieced together based off of a couple tutorials:
- [Apollo Google Cloud Functions Deployment](https://www.apollographql.com/docs/apollo-server/deployment/gcp-functions)
- [Running Apollo Server on Firebase Cloud Functions](https://medium.com/@piuccio/running-apollo-server-on-firebase-cloud-functions-265849e9f5b8)

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

# run local-server.js
node local-server.js
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

- I attempted to get `Typescript` cloud functions working, however, almost every tutorial that I found opted to use `express` with `Javascript`. [This was the only one I did find](https://javascript.plainenglish.io/building-a-graphql-api-using-firebase-functions-and-apollo-9fd56649e556).
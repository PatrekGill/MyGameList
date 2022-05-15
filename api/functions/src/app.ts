import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

const serviceAccount = require("../private/service-account.json");
const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: serviceAccount.database_url,
});

const fireStore = getFirestore(app);

console.log("ran app");


module.exports = {
	app,
	fireStore
}
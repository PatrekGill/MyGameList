import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

const serviceAccountString = fs.readFileSync("./private/service-account.json","utf8");
const serviceAccount = JSON.parse(serviceAccountString);

export const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: serviceAccount.database_url,
});

export const fireStore = getFirestore(app);



console.log("ran app");
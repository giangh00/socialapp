const admin = require('firebase-admin');

// Initialize the app with a service account, granting admin privileges
const serviceAccount = require('./media-b69d0-firebase-adminsdk-j73x3-05d311d6b5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://media-b69d0-default-rtdb.firebaseio.com'
});

module.exports = admin;
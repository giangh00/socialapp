const admin = require('./admin');

// Function to set admin claim
async function setAdminClaim(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Admin claim set for user with UID: ${uid}`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
}

// Replace 'user-uid' with the actual UID of the user
const userUid = 'LkYSeiMuh0fRcSbosm8pWs7KRnC2';
setAdminClaim(userUid);
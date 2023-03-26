import admin from 'firebase-admin'

const serviceAccount = {
  type: process.env.GSA_TYPE,
  project_id: process.env.GSA_PROJECT_ID,
  private_key_id: process.env.GSA_PRIVATE_KEY_ID,
  private_key: process.env.GSA_PRIVATE_KEY,
  client_email: process.env.GSA_CLIENT_EMAIL,
  client_id: process.env.GSA_CLIENT_ID,
  auth_uri: process.env.GSA_AUTH_URI,
  token_uri: process.env.GSA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GSA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GSA_CLIENT_X509_CERT_URL,
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack)
  }
}

export const store = admin.firestore()
export const auth = admin.auth()

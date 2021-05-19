import env from 'react-dotenv';

const config = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.SENDER_ID,
    appId: env.APP_ID
}

export default config;

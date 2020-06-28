const currentEnv = process.env.ENV || 'dev'

const envs = {
  dev: {
    db: {
      client: process.env.DEV_DB_CLIENT,
      dbPath: process.env.DEV_DB_PATH
  },
    purchasesPdfUrl: process.env.DEV_URL,
    fileStorageUrl: process.env.DEV_PDFURL,
    mode: process.env.DEV_MODE,
    twilio: {
      accountSid: process.env.DEV_TWILIO_ACCOUNTSID,
      authToken: process.env.DEV_TWILIO_AUTHTOKEN,
      sender: process.env.DEV_TWILIO_SENDER,
      }
  },
  prod: {
    db: {
      client: process.env.PROD_DB_CLIENT,
      dbPath: process.env.PROD_DB_PATH
  },
    purchasesPdfUrl: process.env.PROD_URL,
    fileStorageUrl: process.env.PROD_PDFURL,
    mode: process.env.PROD_MODE,
    twilio: {
      accountSid: process.env.PROD_TWILIO_ACCOUNTSID,
      authToken: process.env.PROD_TWILIO_AUTHTOKEN,
      sender: process.env.PROD_TWILIO_SENDER,
      }
  }
}

const config = {
  purchasesPdfUrl: envs[currentEnv].purchasesPdfUrl,
  fileStorageUrl: envs[currentEnv].fileStorageUrl,
  db: envs[currentEnv].db,
  mode: envs[currentEnv].mode,
  twilio: envs[currentEnv].twilio,
}

export default config


/* export default {
  purchasesPdfUrl: "src/server/pdf/generated",
  fileStorageUrl: "http://localhost:5000/",
  twilio: {
    accountSid: 'AC4ad2c99f8af10c473575dde6d9dedfd6',
    authToken: '5f057a945a9e1279d2d2e90672734a1a',
    sender: '+12038710956'
  }
} */
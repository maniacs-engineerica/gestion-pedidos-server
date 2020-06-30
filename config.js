const currentEnv = process.env.ENV || 'dev'

const envs = {
  dev: {
    db: {
      client: process.env.DEV_DB_CLIENT,
      dbPath: process.env.DEV_DB_PATH
  },
    purchasesPdfUrl: process.env.DEV_PDFURL,
    fileStorageUrl: process.env.DEV_URL,
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
    purchasesPdfUrl: process.env.PROD_PDFURL,
    fileStorageUrl: process.env.PROD_URL,
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

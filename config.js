const currentEnv = process.env.ENV || 'dev'

const envs = {
  dev: {
    mode: process.env.DEV_MODE,
    port: process.env.DEV_PORT,
    db: {
      client: process.env.DEV_DB_CLIENT,
      dbPath: process.env.DEV_DB_PATH
  },
    purchasesPdfUrl: process.env.DEV_PDFURL,
    fileStorageUrl: process.env.DEV_URL,    
    twilio: {
      accountSid: process.env.DEV_TWILIO_ACCOUNTSID,
      authToken: process.env.DEV_TWILIO_AUTHTOKEN,
      sender: process.env.DEV_TWILIO_SENDER,
      }
  },
  prod: {
    mode: process.env.PROD_MODE,
    port: process.env.PROD_PORT,
    db: {
      client: process.env.PROD_DB_CLIENT,
      name: process.env.PROD_DB_NAME,
      cnxStr: process.env.PROD_DB_CNX_STR
  },
    purchasesPdfUrl: process.env.PROD_PDFURL,
    fileStorageUrl: process.env.PROD_URL,    
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

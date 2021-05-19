const fs = require('fs')
const path = `./.env`
const vars = `
 API_KEY=${process.env.API_KEY}\n
 AUTH_DOMAIN=${process.env.AUTH_DOMAIN}\n
 PROJECT_ID=${process.env.PROJECT_ID}\n
 STORAGE_BUCKET=${process.env.STORAGE_BUCKET}\n
 SENDER_ID=${process.env.SENDER_ID}\n
 APP_ID=${process.env.APP_ID}
`
fs.writeFileSync(path, vars)

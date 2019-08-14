const path = require(`path`)
const bunyan = require(`bunyan`)

const level = process.env.NODE_LOGGING_LEVEL || `info`

const log = bunyan.createLogger({
   name: `chatApp`,
   streams: [
      {
          level,
          path: path.join(__dirname,`routers/public/log.json`)
       }
   ]
})

module.exports = log
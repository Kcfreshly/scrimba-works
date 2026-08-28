import http from 'node:http'
import { sendPayload } from './utils/sendPayload.js'
import { getDataFromDB } from './database/db.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()
    console.log(req.url)
    console.log(req.headers)
    //console.log(req)

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        const filteredData = getDataByQueryParams(destinations, queryObj)

        sendPayload(res, 200, filteredData)
    }
    
    else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = urlObj.pathname.split('/').pop()
        const filteredData = await getDataByPathParams(destinations, 'continent', continent)

        sendPayload(res, 200, filteredData)
    }
    
    else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = urlObj.pathname.split('/').pop()
        const filteredData = await getDataByPathParams(destinations, 'country', country)

        sendPayload(res, 200, filteredData)
    }
    
    else {
        sendPayload(res, 404, { message: 'Not Found' })
    }
})

const PORT = 8000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
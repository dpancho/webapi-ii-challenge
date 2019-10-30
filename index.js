const express = require('express');

const server = express();
const postsRouter = require('./posts/postsRouter');

server.use(express.json());

server.get('/', (req,res) => {
    res.send('Hi from API')
})

server.use('/api/posts', postsRouter)

server.listen(5000, () => {console.log('\n===Server is listening on port 5000===\n')})

const express = require("express")
const app = express()
const port = process.env.PORT || 5000


app.get('/',(req,res)=> {
    res.send({msg:'lets explore the ai'})
})
app.listen(port, () => {
    console.log('server running', port);
})
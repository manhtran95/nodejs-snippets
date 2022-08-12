express = require('express')
const app = express()
const dogRoutes = require('./routes/dogs')
const adminRoutes = require('./routes/admin')

app.use('/dogs', dogRoutes)
app.use('/admin', adminRoutes)

app.use((req, res, next) => {
    if (req.query.isAdmin){
        next()
    } else {
        res.send("SORRY NOT AN ADMIN!")
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000!")
})
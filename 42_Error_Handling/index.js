express = require('express')
app = express()

app.get('/', (req, res) => {
    console.log(1)
})

app.get('/', (req, res) => {
    console.log(2)
})

app.get('/', (req, res, next) => {
    // setTimeout(() => {
    // try{
        err = new Error('BROKEN')
        err.status = 403
        throw err
    // } catch {
        const {status, message} = err;
        res.status(status).send(message)
    // }
    //   next(err)
    // }, 100)
    res.send("123")
  })

app.use((req, res, next) => {
    const {status, message} = err;
    // res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
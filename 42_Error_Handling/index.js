express = require('express')
app = express()

app.get('/', (req, res, next) => {
    console.log(111)
    next()
})

app.get('/', (req, res, n) => {
    console.log(222)
    n()
})

app.get('/', (req, res, next) => {
    // setTimeout(() => {
    // try{
    console.log(333)
    // } catch {
    // const {status, message} = err;
    // res.status(status).send(message)
    // }
    //   next(err)
    // }, 100)
    // res.send("123")
  })

app.use((req, res) => {
    console.log(444)
    // const {status, message} = err;
    // res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
express = require('express')
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/authDemo', {})
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR")
        console.log(err)
    })

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('THIS IS THE HOME PAGE!')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body
    const hash = await bcrypt.hash(password, 12)
    const user = new User({
        username,
        password: hash
    })
    await user.save()
    res.redirect('/')
})

app.get('/secret', (req, res) => {
    res.send('THIS IS SECRET! YOU SHOULD NOT SEE ME IF NOT LOGGED IN!')
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP!")
})
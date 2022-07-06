const express = require('express')
const path = require('path')
app = express()
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid')

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const comments = [
    {
        id: uuid(),
        username: 'Gau Beo',
        comment: 'chau xin 100k'
    },
    {
        id: uuid(),
        username: 'Ty Gay',
        comment: 'chau xin 200k'
    },
    {
        id: uuid(),
        username: 'Manh Chan',
        comment: 'chau xin 300k'
    },
    {
        id: uuid(),
        username: 'Co Buoi',
        comment: 'chau xin 400k'
    },
]


app.post('/comments', (req, res) => {
    const { username, comment} = req.body
    comments.push({username, comment, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    const comment = comments.find(c => c.id === id)
    console.log(comment)
    res.render('comments/show', { comment })
})

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const {id} = req.params
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

app.listen(3000, () => {
    console.log("ON PORT 3000")
})
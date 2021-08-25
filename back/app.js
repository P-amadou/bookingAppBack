const { PrismaClient } = require("@prisma/client")
const express= require('express')
const db = require('./queries')

let port = process.env.PORT || 4242
const prisma = new PrismaClient()

const app = express()
app.use (express.json())

//Users
app.post('/createUser',db.createUser)
app.get('/users', db.getUsers)
app.delete('/delete/users/:id', db.deleteUser)

//Booking
app.post('/createBooking',db.createBooking)
app.get('/booking', db.getBookings)
app.delete('/delete/booking/:id', db.deleteBooking)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
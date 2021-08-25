require('dotenv').config();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
})


const getUsers = async (request, response) => {
    const getusers = await prisma.users.findMany({
    })
    getusers != null ? response.json(getusers) : response.json({
      text: 'No user found'
    })
  }

const getBookings = async (request, response) => {
    const getusers = await prisma.booking.findMany({
    })
    getusers != null ? response.json(getusers) : response.json({
      text: 'No booking found'
    })
  }

const createUser = async (request, response) => {
    const { nom, prenom, email, tel, company } = request.body
      if (err) {
        response.status(403).send(err)
      }
      else {
    await prisma.users.create({
      data: {
        nom: nom,
        prenom: prenom,
        email : email,
        tel: tel,
        company : company
      }
    }).then((res) => {
      if (res != null) {
        response.json({
          text: `User added with id : ${res.id}`
        })
      }
    }).catch((e) => {
      response.json({
        text: `User can't be added`
      })
    })
    }
}

const createBooking = async (request, response) => {
    const { solutions, date, disponible } = request.body
      if (err) {
        response.status(403).send(err)
      }
      else {
    await prisma.booking.create({
      data: {
        solutions: solutions,
        date: Date,
        disponible : disponible,
      }
    }).then((res) => {
      if (res != null) {
        response.json({
          text: `booking added with id : ${res.id}`
        })
      }
    }).catch((e) => {
      response.json({
        text: `Booking can't be added`
      })
    })
    }
}
const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id)
    const deleteUser = await prisma.users.delete({
      where: { id: id },
    }).then((res) => {
      if (res != null) {
        response.json({
          text: `User deleted with id : ${res.id}`
        })
      }
    }).catch((e) => {
      response.json({
        text: `User can't be deleted`
      })
    })
  }
  const deleteBooking = async (request, response) => {
    const id = parseInt(request.params.id)
    const deleteBooking = await prisma.booking.delete({
      where: { id: id },
    }).then((res) => {
      if (res != null) {
        response.json({
          text: `Booking deleted with id : ${res.id}`
        })
      }
    }).catch((e) => {
      response.json({
        text: `Booking can't be deleted`
      })
    })
  }
  
module.exports = {
    getUsers,
    getBookings,
    createUser,
    createBooking,
    deleteUser,
    deleteBooking
    
  }
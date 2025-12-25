import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// GET /greetings - возвращает приветствие
app.get('/greetings', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

// POST /echo - возвращает то, что получил
app.post('/echo', (req, res) => {
  res.json(req.body)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})

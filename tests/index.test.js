const request = require('supertest')
const express = require('express')
const router = require('../routes/api/index')

const app = new express()
app.use(express.json())
app.use('/', router)

describe('Test is working', () => {
    test(`1 should equal 1`, () => {
        expect(1).toBe(1)
    })
})
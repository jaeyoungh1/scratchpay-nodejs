const request = require('supertest')
const express = require('express')
const router = require('../routes/api/index')

const app = new express()
app.use(express.json())
app.use('/', router)

describe('Testing the GET /api/test', function () {
    test(`Testing route works`, async () => {
        const res = await request(app).get('/test');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            "Testing": "Hello World 🌎!"
        })
    })
})

describe("Testing the POST /api/clinics Route", function () {
    test("No Search Terms: All clinics are sent back", async () => {
        const res = await (request(app).post('/clinics')).send({});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                clinicName: 'Good Health Home',
                stateCode: 'FL',
                opening: { from: '15:00', to: '20:00' }
            },
            {
                clinicName: 'National Veterinary Clinic',
                stateCode: 'CA',
                opening: { from: '15:00', to: '22:30' }
            },
            {
                clinicName: 'German Pets Clinics',
                stateCode: 'KS',
                opening: { from: '08:00', to: '20:00' }
            },
            {
                clinicName: 'City Vet Clinic',
                stateCode: 'NV',
                opening: { from: '10:00', to: '22:00' }
            },
            {
                clinicName: 'Scratchpay Test Pet Medical Center',
                stateCode: 'CA',
                opening: { from: '00:00', to: '24:00' }
            },
            {
                name: 'Good Health Home',
                stateName: 'Alaska',
                availability: { from: '10:00', to: '19:30' }
            },
            {
                name: 'Mayo Clinic',
                stateName: 'Florida',
                availability: { from: '09:00', to: '20:00' }
            },
            {
                name: 'Cleveland Clinic',
                stateName: 'New York',
                availability: { from: '11:00', to: '22:00' }
            },
            {
                name: 'Hopkins Hospital Baltimore',
                stateName: 'Florida',
                availability: { from: '07:00', to: '22:00' }
            },
            {
                name: 'Mount Sinai Hospital',
                stateName: 'California',
                availability: { from: '12:00', to: '22:00' }
            },
            {
                name: 'Tufts Medical Center',
                stateName: 'Kansas',
                availability: { from: '10:00', to: '23:00' }
            },
            {
                name: 'UAB Hospital',
                stateName: 'Alaska',
                availability: { from: '11:00', to: '22:00' }
            },
            {
                name: 'Swedish Medical Center',
                stateName: 'Arizona',
                availability: { from: '07:00', to: '20:00' }
            },
            {
                name: 'Scratchpay Test Pet Medical Center',
                stateName: 'California',
                availability: { from: '00:00', to: '24:00' }
            },
            {
                name: 'Scratchpay Official practice',
                stateName: 'Tennessee',
                availability: { from: '00:00', to: '24:00' }
            }
        ])
    })
    test("State: Filtering for CA clinics with state code", async () => {
        const res = await (request(app).post('/clinics')).send({ "state": "CA" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                clinicName: 'National Veterinary Clinic',
                stateCode: 'CA',
                opening: { from: '15:00', to: '22:30' }
            },
            {
                clinicName: 'Scratchpay Test Pet Medical Center',
                stateCode: 'CA',
                opening: { from: '00:00', to: '24:00' }
            },
            {
                name: 'Mount Sinai Hospital',
                stateName: 'California',
                availability: { from: '12:00', to: '22:00' }
            },
            {
                name: 'Scratchpay Test Pet Medical Center',
                stateName: 'California',
                availability: { from: '00:00', to: '24:00' }
            }
        ])
    })
    test("State: Filtering for California clinics with state name", async () => {
        const res = await (request(app).post('/clinics')).send({ "state": "California" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                clinicName: 'National Veterinary Clinic',
                stateCode: 'CA',
                opening: { from: '15:00', to: '22:30' }
            },
            {
                clinicName: 'Scratchpay Test Pet Medical Center',
                stateCode: 'CA',
                opening: { from: '00:00', to: '24:00' }
            },
            {
                name: 'Mount Sinai Hospital',
                stateName: 'California',
                availability: { from: '12:00', to: '22:00' }
            },
            {
                name: 'Scratchpay Test Pet Medical Center',
                stateName: 'California',
                availability: { from: '00:00', to: '24:00' }
            }
        ])
    })
    test("Name: Filtering for clinics named 'Scratchpay Test Pet Medical Center'", async () => {
        const res = await (request(app).post('/clinics')).send({ "name": "Scratchpay Test Pet Medical Center" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                clinicName: 'Scratchpay Test Pet Medical Center',
                stateCode: 'CA',
                opening: { from: '00:00', to: '24:00' }
            },
            {
                name: 'Scratchpay Test Pet Medical Center',
                stateName: 'California',
                availability: { from: '00:00', to: '24:00' }
            }
        ])
    })
    test(`Name: Filtering for clinics called 'scratchpay test pet medical center'`, async () => {
        const res = await request(app).post('/clinics').send({ "name": "scratchpay test pet medical center" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                clinicName: 'Scratchpay Test Pet Medical Center',
                stateCode: 'CA',
                opening: { from: '00:00', to: '24:00' }
            },
            {
                name: 'Scratchpay Test Pet Medical Center',
                stateName: 'California',
                availability: { from: '00:00', to: '24:00' }
            }
        ])
    })
    test(`Availability: Filtering for clinics open between 08:00 and 20:00 `, async () => {
        const res = await request(app).post('/clinics').send({ "from": "08:00", "to": "20:00" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
              clinicName: 'German Pets Clinics',
              stateCode: 'KS',
              opening: { from: '08:00', to: '20:00' }
            },
            {
              clinicName: 'Scratchpay Test Pet Medical Center',
              stateCode: 'CA',
              opening: { from: '00:00', to: '24:00' }
            },
            {
              name: 'Hopkins Hospital Baltimore',
              stateName: 'Florida',
              availability: { from: '07:00', to: '22:00' }
            },
            {
              name: 'Swedish Medical Center',
              stateName: 'Arizona',
              availability: { from: '07:00', to: '20:00' }
            },
            {
              name: 'Scratchpay Test Pet Medical Center',
              stateName: 'California',
              availability: { from: '00:00', to: '24:00' }
            },
            {
              name: 'Scratchpay Official practice',
              stateName: 'Tennessee',
              availability: { from: '00:00', to: '24:00' }
            }
          ])
    })
    test(`All Search Terms: Filtering for FL clinics called 'Good Health Home' open from "16:00" to "18:00"`, async () => {
        const res = await request(app).post('/clinics').send({ "name":"Good Health Home","state": "FL" , "from": "16:00", "to":"18:00"});
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([
            {
                "clinicName": "Good Health Home",
                "stateCode": "FL",
                "opening": {
                    "from": "15:00",
                    "to": "20:00"
                }
            }
        ])
    })
})
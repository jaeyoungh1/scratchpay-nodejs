const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

const {filterResults, getAllClinicData} = require('../../filters')
const clinic_list = require('../../clinics/clinics.json')
const urls = clinic_list.map(obj => obj.clinic_url)


router.post('/clinics', async (req, res) => {
    // get search filter terms from request
    const {state, name, from, to} = req.body

    // get all Clinic Data from an array of urls
    const data = await getAllClinicData(urls)

    // filter all Clinic Data based on search filter terms
    const response = filterResults(data, state, name, from, to)

    res.json(response)    
})

// generic test route
router.get('/test', function (req, res) {
    res.json({ "Testing": "Hello World 🌎!" });
});


module.exports = router
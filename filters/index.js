// Helpers to filter the result for the /api/clinics route
const fetch = require('node-fetch')

// Object to map state codes to state names
let statesCodeObj = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

function convertNameToLowercase(str) {
    let result
    if (str && typeof (str) === "string") {
        result = str.toLowerCase()
    }
    return result
}

function convertStateCodeToName(str) {
    let result
    if (str && typeof (str) === "string" && str.length === 2) {
        result = statesCodeObj[str]
    }
    return result
}

function convertTimeStringToNumber(str) {
    let result
    if (str && typeof (str) === "string") {
        result = Number(str.replace(":", ""))
    }
    return result
}

// get all Clinic Data from an array of urls
async function getAllClinicData(arr) {
    let result = []
    const array = await Promise.all(
        arr.map((url) => fetch(url).then((res) => res.json()))
    )
    // flatten the nested jsons
    const flattenedArray = array.map(arr => {
        result = [...result, ...arr]
    })

    return result
}

// filter a json response based on params: state, name, from, to
function filterResults(response, state, name, from, to) {
    if (state) {
        let stateParam = state.length === 2 ? convertStateCodeToName(state) : state
        response = response.filter(obj => {
            let clinicState = obj.stateCode ? convertStateCodeToName(obj.stateCode) : obj.stateName
            return clinicState === stateParam
        })
    }
    if (name) {
        let nameParam = convertNameToLowercase(name)
        response = response.filter(obj => {
            let clinicName = obj.name ? convertNameToLowercase(obj.name) : convertNameToLowercase(obj.clinicName)
            return clinicName === nameParam
        })
    }
    if (from) {
        let fromParam = convertTimeStringToNumber(from)
        response = response.filter(obj => {
            let clinicFrom = obj.opening ? convertTimeStringToNumber(obj.opening.from) : convertTimeStringToNumber(obj.availability.from)
            return fromParam >= clinicFrom
        })
    }
    if (to) {
        let toParam = convertTimeStringToNumber(to)
        response = response.filter(obj => {
            let clinicTo = obj.opening ? convertTimeStringToNumber(obj.opening.to) : convertTimeStringToNumber(obj.availability.to)
            return toParam <= clinicTo
        })
    }
    return response
}

module.exports = {
    filterResults,
    getAllClinicData
}
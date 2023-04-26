# Software Engineer Challenge

## Run with Docker
You must have Docker installed and PORT 3000 available.

```
docker build -t USERNAME/clinic-search-demo .

docker run -dp 3000:3000 USERNAME/node-demo
```

## Run locally without Docker
Create a .env file based on the .env.example file.

Navigate to the root of this project and run in development with hot restart
```
npm install
npm run dev
```

#### Test locally
Run npm test in the root of the project.
```
npm test
```

## Assumptions
- I assumed that any search criteria would be received in the request body 
- As the instructions specify that a database can't be used, I assumed that the route should use the provided Google API urls rather than manually copy-and-pasting the json objects 
- The endpoint is written assuming that the clinic data will have the same format with three attributes that refer to the clinic's name, state, and opening:
```
{
    "name":"name",
    "state":"state",
    "opening":{
        "from":"00:00",
        "to":"24:00"
    }
}
```
- I also assumed that the name key will only ever be called "name" or "clinicName", that the state key will only ever be called "stateCode" or "stateName", that the availability key will only ever be called "opening" or "availability", and that the opening and closing time would only ever be called "from" and "to".
- I assumed that the "opening"/"availability" times would always be in military time in "00:00" format.
- The test are written using the provided Google API urls
- I saw that there are clinics located in the same state with the same name; however, since there are no "unique identifiers" (e.g. Clinic IDs), I wrote the endpoint so that it sends any response back as if these are different clinics rather than the same clinic
- I assumed that the clinics don't have to be sent back in any particular order or priority

## Challenge Instructions:
The objective of this challenge is to call some endpoints containing a list of clinics and perform some actions on the result.


The list of clinics can be found at:

https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json

https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json


#### Create one RESTful API endpoint to **allow search** in multiple clinic providers and display results from all the available clinics by any of the following:

- Clinic Name
- State [ex: "CA" or "California"]
- Availability [ex: from:09:00, to:20:00]

This is including search by multiple criteria in the same time like search by state and availability together.

Note: We need only one endpoint to search for all clinics.

## What we are looking for

- **Simple, clear, readable code** How well structured it is? Clear separation of concerns? Can anyone just look at it and get the idea to
what is being done? Does it follow any standards?
- **Correctness** Does the application do what it promises? Can we find bugs or trivial flaws?
- **Security** Are there any obvious vulnerability?
- **Memory efficiency** How will it behave in case of large datasets?
- **Testing** How well tested your application is? Can you give some metrics?
- **Documentation** Is the code self documented and it's easy to understand it by just reading? 

## Nice To Have
- Implementation for any CI tool for the project.
- Project Dockerization.

## Conditions
- The challenge must be solved in NodeJS.
- Do not use any database or any full text search engines.
- Write full test using any test suite.
- If you make any assumptions, mention them clearly in the readme file.

## Commit History
Use whatever development workflow works best for you. If your solution is small enough and a single commit is justified, that's fine; we just ask that you keep your commit history as coherent as possible.

## Delivery
The challenge solution should be delivered as a link to a public git repository.


## Note
The goal is not to finish everything 100%. Quality > Quantity.

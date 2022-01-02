const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Company = db.Company;
const IndustryType = db.IndustryType;
const Country = db.Country;
const City = db.City;

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

  db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');

  IndustryType.sync().then(() => {
    const industryTypes = [
      { name: 'Software'},
      { name: 'Sales'} ,
      { name: 'Development'} 
        ]
    
    for(let i=0; i<industryTypes.length; i++){
      IndustryType.create(industryTypes[i]);
    }
  })

  Country.sync().then(() => {
    const countries = [
      { name: 'Egypt'},
      { name: 'United Kingdom'} ,
      { name: 'France'} ,
      { name: 'Germany'} ,
    ]
    
    for(let i=0; i<countries.length; i++){
        Country.create(countries[i]);
    }
  })

  City.sync().then(() => {
    const cities = [
      { name: 'Cairo',countryId:1},
      { name: 'Giza',countryId:1} ,
      { name: 'Alex',countryId:1} ,
      { name: 'Luxor',countryId:1} ,
      { name: 'Aswan',countryId:1} ,

      { name: 'London',countryId:2},
      { name: 'Kent',countryId:2},
      { name: 'Cambridge',countryId:2},
      { name: 'Manchester',countryId:2},
      
      { name: 'Paris',countryId:3},
      { name: 'Lyon',countryId:3},
      { name: 'Calais',countryId:3},

      { name: 'Berlin',countryId:4},
      { name: 'Munich',countryId:4},
      { name: 'Frankfurt',countryId:4},
      { name: 'Hamburg',countryId:4},

    ]
    
    for(let i=0; i<cities.length; i++){
        City.create(cities[i]);
    }
  })

  Company.sync().then(() => {
    const companies = [
      { name: 'Jack', description: 'desc', 
      isActive: true, address: '374 William S Canning Blvd', industryTypeId:1 , countryId:1,cityId:1},
      { name: 'Adam', description: 'Johnson', 
      isActive: true, address: 'Fall River MA 2721. 121 Worcester Rd' , industryTypeId:2 , countryId:2 , cityId:7},
      { name: 'Dana', description: 'Bay', 
      isActive: false, address: 'Framingham MA 1701. 677 Timpany Blvd', industryTypeId:1 , countryId:3 ,cityId:9},
    ]
    
    for(let i=0; i<companies.length; i++){
      Company.create(companies[i]);
    }
  })
}); 
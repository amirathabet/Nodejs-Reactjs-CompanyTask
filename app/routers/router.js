let express = require('express');
let router = express.Router();
 
const companies = require('../controllers/controller.js');

router.post('/api/company', companies.createCompany);
router.get('/api/company/:id', companies.getCompany);
router.get('/api/companies', companies.companies);
router.put('/api/company', companies.updateCompany);
router.delete('/api/company/:id', companies.deleteCompany);
router.get('/api/countries', companies.countries);
router.get('/api/industryTypes', companies.industryTypes);
router.get('/api/cities/:id', companies.cities);
router.get('/api/getCountryName/:id', companies.getCountryName);
router.get('/api/getCityName/:id', companies.getCityName);

module.exports = router;
// const { Country } = require('../config/db.config.js');
const db = require('../config/db.config.js');

const Company = db.Company;
const Country=db.Country;
const City=db.City;
const IndustryType=db.IndustryType;

exports.createCompany = (req, res) => {
    let company = {};

    try{
        // Building company object from upoading request's body
        company.name = req.body.name;
        company. description = req.body.description;
        company.address = req.body.address;
        company.isActive = req.body.isActive;
        company.industryTypeId = req.body.industryTypeId;
        company.countryId = req.body.countryId;
        company.cityId = req.body.cityId;
    
        // Save to MySQL database
        Company.create(company, 
                          {attributes: ['name', 'description', 'isActive', 'address', 'countryId', "cityId","industryTypeId"]})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getCompany = (req, res) => {
    Company.findByPk(req.params.id, 
                        {attributes: ['id', 'name', 'description', 'isActive', 'address', 'countryId', "cityId","industryTypeId"]})
        .then( async company => {

            let companyViewModel = {
                id : company.id,
                name:company.name,
                description:company.description,
                isActive:company.isActive,
                address:company.address,
                
            };
            await Country.findByPk(company.countryId, {attributes: ['id', 'name']})
            .then(country => {
                companyViewModel.countryId = country.id;
                companyViewModel.countryname = country.name;
            });
            await City.findByPk(company.cityId, {attributes: ['id', 'name']})
            .then(city => {
                companyViewModel.cityId = city.id;
                companyViewModel.cityname = city.name;
            });
            await IndustryType.findByPk(company.industryTypeId, {attributes: ['id', 'name']})
            .then(industryType => {
                companyViewModel.industryTypeId = industryType.id;
                companyViewModel.industryTypename = industryType.name;
            });

          res.status(200).json(companyViewModel);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.companies = async (req, res) => {
    // find all companies information from 
    let condition = 
    {
        where : {
            isActive:true
        }
    }
    if(req.params.name)
    {
        condition.where.name=req.params.name;
    }
    try{
        Company.findAll(condition,{attributes: ['id', 'name', 'description', 'isActive', 'address','countryId' , 'cityId']},)
        .then(async companies => {

            let results =[];
            for (let index = 0; index < companies.length; index++) {
                const element = companies[index];
                let companyViewModel = {
                    id : element.id,
                    name:element.name,
                    description:element.description,
                    isActive:element.isActive,
                    address:element.address,
                    
                };
                await Country.findByPk(element.countryId, {attributes: ['id', 'name']})
                .then(country => {
                    companyViewModel.countryId = country.id;
                    companyViewModel.countryname = country.name;
                });
                await City.findByPk(element.cityId, {attributes: ['id', 'name']})
                .then(city => {
                    companyViewModel.cityId = city.id;
                    companyViewModel.cityname = city.name;
                });
                await IndustryType.findByPk(element.industryTypeId, {attributes: ['id', 'name']})
                .then(industryType => {
                    companyViewModel.industryTypeId = industryType.id;
                    companyViewModel.industryTypename = industryType.name;
                });
                results.push(companyViewModel);
            }
           
          //companies[1].countryId=this.getCountryName('test',res) ;
            
         //companies[1].countryId = x;

            res.status(200).json(results);
        })
    }catch(error) {
        // log on console

        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.deleteCompany = async (req, res) => {
    try{
        let companyId = req.params.id;
        let company = await Company.findByPk(companyId);

        if(!company){
            res.status(404).json({
                message: "Does Not exist a Company with id = " + companyId,
                error: "404",
            });
        } else {
            await company.destroy();
            res.status(200).json({
                message: "Delete a Company with id = " + companyId
            });;
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a company with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateCompany = async (req, res) => {
    try{
        let company = await Company.findByPk(req.body.id);
    
        if(!company){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a company with id = " + id,
                error: "404"
            });
        } else {  

            // update new change to database
            let updatedObject = {
                name : req.body.name,
                description : req.body.description,
                address : req.body.address,
                isActive : req.body.isActive,
                industryType : req.body.industryType,
                countryId : req.body.countryId,
                cityId : req.body.cityId
            }
            let result = await Company.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'name', 'description', 'isActive', 'address', 'countryId', "cityId"]
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a company with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a company with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.countries = (req, res) => {
    // find all countries 
    try{
        Country.findAll({attributes: ['id', 'name']})
        .then(countries => {
            res.status(200).json(countries);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}


exports.cities = (req, res) => {
    // find all cities in countries 
    try{
        City.findAll({ where: {countryId:req.params.id}},{attributes: ['id', 'name']})
        .then(cities => {
            res.status(200).json(cities);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.industryTypes = (req, res) => {
    // find all industryTypes
    try{
        IndustryType.findAll({attributes: ['id', 'name']})
        .then(industryTypes => {
            res.status(200).json(industryTypes);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getCountryName = ( id,res) => {
    Country.findByPk(1, {attributes: ['id', 'name']})
        .then(country => {
          res.status(200).json(country.name);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}
exports.getCityName = (req, res) => {
    City.findByPk(req.params.id, 
                        {attributes: ['id', 'name']})
        .then(city => {
          res.status(200).json(city);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}
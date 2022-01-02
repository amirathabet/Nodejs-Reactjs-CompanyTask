module.exports = (sequelize, Sequelize) => {
	const Company = sequelize.define('company', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  name: {
			type: Sequelize.STRING
    },
	  description: {
		  type: Sequelize.STRING
  	},
      industryTypeId: {
        type: Sequelize.INTEGER
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
	  address: {
			type: Sequelize.STRING
	  },
	 
      countryId: {
        type: Sequelize.INTEGER
    },
      cityId: {
         type: Sequelize.INTEGER
    }
    
	});
	
	return Company;
}
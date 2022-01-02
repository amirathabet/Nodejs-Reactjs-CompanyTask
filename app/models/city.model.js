module.exports = (sequelize, Sequelize) => {
	const City = sequelize.define('city', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  name: {
			type: Sequelize.STRING
	  },
	  countryId: {
			type: Sequelize.INTEGER
    }
    
	});
	
    City.associate = models =>
    {
        City.hasMany(models.Company);//`CityId` will be added on Company 
    }
	return City;
}
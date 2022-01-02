module.exports = (sequelize, Sequelize) => {
	const Country = sequelize.define('country', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  name: {
			type: Sequelize.STRING
	  }
	 
	});

	Country.associate = models =>
    {
        Country.hasMany(models.Company);//`CountryId` will be added on Company 
        Country.hasMany(models.City);//`CountryId` will be added on City 
    }
	return Country;
}
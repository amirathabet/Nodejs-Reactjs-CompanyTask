module.exports = (sequelize, Sequelize) => {
	const IndustryType = sequelize.define('industryType', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  name: {
			type: Sequelize.STRING
	  }
	 
	});
	IndustryType.associate = models =>
    {
        IndustryType.hasMany(models.Company);//`IndustryTypeId` will be added on Company 
    }

	return IndustryType;
}
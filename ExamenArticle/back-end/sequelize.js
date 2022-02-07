const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqlite/ArticelDB.db"
});

sequelize.sync({alter:true}).then(()=>{
    console.log("Modelele au fost sincronizare");
})

module.exports = sequelize;

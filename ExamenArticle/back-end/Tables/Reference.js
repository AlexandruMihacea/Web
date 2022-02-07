const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

module.exports = (sequelize, DataTypes) => {
    const Reference = sequelize.define(
        "Reference",
        {
            id_ref: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titlu:{
                type: DataTypes.STRING,
                validator: {
                    len: {
                        args: [5,100],
                        msg:'Titlu trebuie sa aibe macar 5 caractere !' 
                    }
                }
            },
            data:{
                type: DataTypes.STRING
            },
            listaAutori:{
                type: DataTypes.STRING
            }

        }
    );
    return Reference;
}
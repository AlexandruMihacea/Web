const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../sequelize");

module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define(
        'Article',
        {
            id_art: {
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
            rezumat:{
                    type: DataTypes.STRING,
                    validator: {
                        len: {
                            args: [10,1000],
                            msg:'Rezumatul trebuie sa aibe macar 10 caractere !' 
                        }
                    }
                
            },
            data:{
                type: DataTypes.STRING,
            }
        }
    );
    return Article;
}
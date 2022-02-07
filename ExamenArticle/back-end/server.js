const express = require("express");
const sequelize = require('./sequelize');
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
    origin: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Headers"
    ],
    credentials: true,
    enablePreflight: true,
};


const app = express();
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,DELETE,PUT,POST");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Content-Range','posts 0-20/20');
    next();
});
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

const port = 7000;

//BD
const Article = require("./Tables/Article")(sequelize, Sequelize);
const Reference = require("./Tables/Reference")(sequelize,Sequelize);

Article.hasMany(Reference, {foreignKey: "id_art"});

//Routes
const router = express.Router();
app.use("/app", router);



router.route('/Article')
    .get(async(req,res,next) =>{
        try{
            const allAricle = await Article.findAll();
            res.status(200).json(allAricle);
        }catch(err){
            next(err);
        }
        
    })

    .post(async(req,res,next) => {
        try{
            const sendArticle = req.body;
            const article = await Article.create(sendArticle);
            return res.status(200).json(article);
        }catch(err){
            next(err)
        }
    })

router.route("/Article/:id_art")
    .put(async(req,res,next)=>{
        try{
            const article = await Article.findByPk(req.params.id_art);
            if(article){
                const updateArticle = await article.update(req.body);
                res.status(200).json(updateArticle);
            }else{
                return res.status(404).json({message:`Articolul ${req.params.id_art} nu a fost gasit !`});
            }
        }catch(err){
            next(err);
        }
    })

    .delete(async(req, res, next) => {
        try{
            const toDelete = await Article.destroy({
                where: {
                    id_art: req.params.id_art,
                }
            })
            res.status(200).json({message:`Articlocul ${req.params.id_art} a fost sters`});
        }catch(err){
            next(err);
        }
    })


router.route("/Reference")
    .get(async (req,res, next) => {
        try{
            const reference = await Reference.findAll();
            res.status(200).json(reference);
        }catch(err){
            next(err);
        }
    })

    .post(async (req,res,next) => {
    try{
        const sendReference = req.body;
        const reference = await Reference.create(sendReference);
        res.status(200).json(reference);
    }catch(err){
        next(err);
    }
})

router.route('/Reference/:id_ref')
        .put(async (req, res, next) => {
            try{
                const oneReference = await Reference.findByPk(req.params.id_ref);
                if(oneReference){
                    const updateReference = await oneReference.update(req.body);
                    res.status(200).json("Referinta s-a updatat!");
                }else{
                    res.status(404).json({messaje:`Referinta ${req.params.id_ref} nu esxista`});
                }
            }catch(err){
                next(err)
            }
        })

        .delete(async (req,res, next) => {
            try{
                const toDelete = await Reference.destroy({
                    where: {
                        id_ref: req.params.id_ref,
                    }
                })
                res.status(200).json({messaje: `A fost stearsa referinta ${req.params.id_ref}`});
            }catch(err){
                next(err);
            }
            
        })



        router.route("/Article/:id_art/Reference")
            .get(async (req,res,next) => {
                try{
                    const article = await Article.findByPk(req.params.id_art);
                    if(article){
                        const reference = await Reference.findAll({
                            where: {
                                id_art: req.params.id_art
                            }
                        })
                    res.status(200).json(reference);
                    }
                }catch(err){
                    next(err)
                }
            })










app.listen(port, async () =>{
    console.log(`Serverul merge pe portul ${port}`);
    try{
        await sequelize.authenticate();
        console.log("S-a facut conecsiune cu BD")
    }catch{
        console.error("Nu merge conexiune");
    }
});
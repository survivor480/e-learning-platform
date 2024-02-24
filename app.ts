import express from 'express';

import * as user_route from "./routes/user.routes";

import {create_models} from "./models/index";

import * as bodyparser from 'body-parser';

import config from "./config/config";

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: 'postgres'
    }
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))

bodyparser.urlencoded({extended: false});

create_models(false);

app.use('/user', user_route.router);

app.listen(PORT, () => {
    console.log("This Server has started");
})

export {app, sequelize};

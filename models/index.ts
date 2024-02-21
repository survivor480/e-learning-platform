import User from "./user.model";


const create_models = async (alter=true) => {
    console.log("Create Models Function Called");

    User.sync({alter: alter});
}


export default create_models;
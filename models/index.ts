import User from "./user.model";
import Course from "./courses.model";

const create_models = async (alter=true) => {
    console.log("Create Models Function Called");

    User.sync({alter: alter});

    Course.sync({alter: alter});
}


export {create_models};
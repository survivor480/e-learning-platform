import User from "./user.model";
import Course from "./courses.model";
import Community from "./community.model";
import Courses from "./courses.model";
import Educator from "./educator.model";
import TestSeries from "./test_series.model";
import Documents from "./documents.model";

const create_models = async (alter=true) => {
    console.log("Create Models Function Called");

    // User Table Creation
    User.sync({alter: alter});

    // Course Table Creation
    Course.sync({alter: alter});

    // Community Table Creation
    Community.sync({alter: alter});

    // Courses Table Creation
    Courses.sync({alter: alter});

    // Educator Table Creation
    Educator.sync({alter: alter});

    // Test Series Table Creation
    TestSeries.sync({alter: alter});
    
    // Document Table Creation;
    Documents.sync({alter: alter});
}


export {create_models};
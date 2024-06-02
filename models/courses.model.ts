import {Sequelize, Model, DataTypes} from 'sequelize';
import configs from '../config/config';

const sequelize = new Sequelize(
    configs.database,
    configs.user,
    configs.password,
    {
        host: configs.host,
        port: configs.port,
        dialect: 'postgres',
        logging: false,
    },
);

class Course extends Model {
    public course_id!: number;
    public course_name!: string;
    public course_fees!: string;
    public created_at!: Date;
    public updated_at!: Date;

    // Define static method for creating a user
    static async createCourse(courseData: Partial<Course>): Promise<Course> {
        const course = await Course.findOne({where: {
            course_name: courseData.course_name
        }});

        const transaction = await sequelize.transaction();

        if(course) throw {error: 'Course Already Exists in the same name', type: 'custom'};

        await Course.create(courseData, {transaction: transaction});

        const course_instance = await Course.findOne({where: courseData, transaction: transaction});

        // Dont want to save everything that runs in tests
        if(process.env.environment !== 'test') await transaction.commit();

        if(!course_instance) throw {error: 'Course Could not be created', type: 'custom'};

        return course_instance;
    }

    // This fetches all the courses that are created as of now
    static async getAllCourses(): Promise<Course[] | null> {
        return Course.findAll();
    }

    // Define static method for reading a single user by ID
    static async getCourseByName(name: string): Promise<Course | null> {
        return Course.findOne({where: {couse_name: name}});
    }

    // Define instance method for updating a user
    async updateUser(courseData: Partial<Course>): Promise<void> {
        await this.update(courseData, {
            where: {
                course_id: courseData.course_id
            }
        });
    }
}

Course.init({
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course_fees: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'course',
    underscored: true
});


export default Course;

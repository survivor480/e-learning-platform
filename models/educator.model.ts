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

class Educator extends Model {
    public course_id!: number;
    public course_name!: string;
    public course_fees!: string;
    public created_at!: Date;
    public updated_at!: Date;

    // Define static method for creating a user
    static async createCourse(EducatorData: Partial<Educator>): Promise<Educator> {
        const Educator = await Educator.findOne({where: {
            educator_name: EducatorData.educator_name
        }});

        const transaction = await sequelize.transaction();

        if(Educator) throw {error: 'Educator Already Exists in the same name', type: 'custom'};

        await Educator.create(EducatorData, {transaction: transaction});

        const Educator_instance = await Educator.findOne({where: EducatorData, transaction: transaction});

        // Dont want to save everything that runs in tests
        if(process.env.environment !== 'test') await transaction.commit();

        if(!Educator_instance) throw {error: 'Educator Could not be created', type: 'custom'};

        return Educator_instance;
    }

    // This fetches all the Educators that are created as of now
    static async getAllEducators(): Promise<Educator[] | null> {
        return Educator.findAll();
    }

    // Define static method for reading a single user by ID
    static async getEducatorByName(name: string): Promise<Educator | null> {
        return Educator.findOne({where: {couse_name: name}});
    }

    // Define instance method for updating a user
    async updateUser(EducatorData: Partial<Educator>): Promise<void> {
        await this.update(EducatorData);
    }
}

Educator.init({
    Educator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    educator_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    educator_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    educator_educational_qualifications: {
        type: DataTypes
    }
}, {
    sequelize,
    modelName: 'Educator',
    underscored: true
});


export default Educator;

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
    public educator_id!: number;
    public educator_name!: string;
    public educator_description!: string;
    public educator_educational_qualifications!: string[];
    public delete_flag!: boolean;
    public delete_date!: Date;

    // Define static method for creating a user
    static async createCourse(EducatorData: Partial<Educator>): Promise<Educator> {
        const educator = await Educator.findOne({where: {
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
    educator_id: {
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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    delete_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    delete_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Educator',
    underscored: true
});


export default Educator;

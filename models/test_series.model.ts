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
        logging: false
    }
)

class TestSeries extends Model {
    public test_id!: number;
    public test_title!: string;
    public test_description!: string;
    public course_id!: number;
    public delete_flag!: boolean;
    public delete_date!: Date


    // Define static method for creating a document
    static async createTestSeries(testData: Partial<TestSeries>): Promise<TestSeries> {
        const test = await TestSeries.findOne({
            where: {
                test_title: testData.test_title
            }
        });

        const transaction = await sequelize.transaction();

        if(test) throw {error: 'Test Series Already Exists', type: 'custom'};

        const test_instance = await TestSeries.create(testData, {transaction: transaction});

        if(process.env.environment !== 'test') await transaction.commit();

        if(!test_instance) throw {error: 'TestSeries Could not be created', type: 'custom'};

        return test_instance;
    }

    // This fetches all the TestSeries that exist as of now
    static async getAllTestSeries(): Promise<TestSeries[] | null> {
        return TestSeries.findAll();
    }

    // Read Document that have a particular name
    static async getTestSeriesByName(name: string): Promise<TestSeries | null> {
        return TestSeries.findOne({where: {TestSeries_name: name}});
    }

    // Document Update method
    static async updateTestSeries(testData: Partial<TestSeries>): Promise<void> {
        await this.update(testData, {
            where: {
                test_id: testData.test_id
            }
        });
    }
}


TestSeries.init({
    test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    test_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    test_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    modelName: 'test_series_master',
    underscored: true
})

export default TestSeries;
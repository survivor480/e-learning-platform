import {Sequelize, Model, DataTypes, Op} from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: 'postgres',
        logging: false
    }
);

class User extends Model {
    public id!: number;
    public username!: string;
    public name!: string;
    public email!: string;
    public phone_number!: number;
    public password!: string;

    // Define static method for creating a user
    static async createUser(userData: Partial<User>): Promise<User> {
        const {password, ...userDataWithoutPassword} = userData;

        const user = await User.findAll({where: {
            [Op.or]: [
                { username: userData.username },
                { name: userData.name },
                { email: userData.email }
            ]
        }});

        const transaction = await sequelize.transaction();

        if(user.length > 0){
            throw {error: 'User Already Exists', type: 'custom', statusCode: 409}
        }

        await User.create(userData, {transaction: transaction});

        const user_instance = await User.findOne({where: userDataWithoutPassword, attributes: {exclude: ['password']}, transaction: transaction});

        // Dont want to save everything that runs in tests
        if(process.env.environment !== 'test') transaction.commit();

        console.log("The environment variable is: ", process.env.environment);

        if (!user_instance) {
            throw {error: 'User could not be created', type: 'custom'};
        }

        return user_instance;
    }

    // Define static method for reading a single user by ID
    static async getUserByEmail(email: string): Promise<User | null> {
        return User.findOne({where: {email: email}, attributes: {exclude: ['password']}});
    }

    // Define instance method for updating a user
    async updateUser(userData: Partial<User>): Promise<void> {
        await this.update(userData);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});


export default User;

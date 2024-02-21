import {Sequelize, Model, DataTypes} from 'sequelize';
import * as config from '../config/config.json';

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: 'postgres'
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
        return User.create(userData);
    }

    // Define static method for reading all users
    static async getAllUsers(): Promise<User[]> {
        return User.findAll();
    }

    // Define static method for reading a single user by ID
    static async getUserById(userId: number): Promise<User | null> {
        return User.findByPk(userId);
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

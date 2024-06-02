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

class Community extends Model {
    public community_id!: number;
    public community_name!: string;
    public community_description!: string;
    public educator_id!: number;
    public delete_flag!: boolean;
    public delete_date!: Date

    // Define static method for creating a document
    static async createDocument(communityData: Partial<Community>): Promise<Community> {
        const community = await Community.findOne({
            where: {
                community_name: communityData.community_name
            }
        });

        const transaction = await sequelize.transaction();

        if(community) throw {error: 'Community Already Exists', type: 'custom'};

        const community_instance = await Community.create(communityData, {transaction: transaction});

        if(process.env.environment !== 'test') await transaction.commit();

        if(!community_instance) throw {error: 'Community Could not be created', type: 'custom'};

        return community_instance;
    }

    // This fetches all the Community that exist as of now
    static async getAllCommunity(): Promise<Community[] | null> {
        return Community.findAll();
    }

    // Read Document that have a particular name
    static async getCommunityByName(name: string): Promise<Community | null> {
        return Community.findOne({where: {community_name: name}});
    }

    // Document Update method
    static async updateCommunity(communityData: Partial<Community>): Promise<void> {
        await this.update(communityData, {
            where: {
                community_id: communityData.community_id
            }
        });
    }
}


Community.init({
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    community_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    community_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    educator_id: {
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
    modelName: 'community_master',
    underscored: true
})

export default Community;
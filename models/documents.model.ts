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

class Documents extends Model {
    public document_id!: number;
    public document_name!: string;
    public document_original_name!: string;
    public document_description!: string;
    public course_id!: number;
    public marked!: boolean;
    public document_address!: string;
    public delete_flag!: boolean;
    public delete_date!: Date;


    // Define static method for creating a document
    static async createDocument(documentData: Partial<Documents>): Promise<Documents> {
        const document = await Documents.findOne({
            where: {
                document_original_name: documentData.document_original_name
            }
        });

        const transaction = await sequelize.transaction();

        if(document) throw {error: 'Document Already Exists', type: 'custom'};

        const document_instance = await Documents.create(documentData, {transaction: transaction});

        if(process.env.environment !== 'test') await transaction.commit();

        if(!document_instance) throw {error: 'Document Could not be created', type: 'custom'};

        return document_instance;
    }

    // This fetches all the Documents that exist as of now
    static async getAllDocuments(): Promise<Documents[] | null> {
        return Documents.findAll();
    }

    // Read Document that have a particular name
    static async getDocumentByName(name: string): Promise<Documents | null> {
        return Documents.findOne({where: {document_name: name}});
    }

    // Document Update method
    static async updateDocument(documentData: Partial<Documents>): Promise<void> {
        await this.update(documentData, {
            where: {
                document_id: documentData.document_id
            }
        });
    }
}


Documents.init({
    document_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    document_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document_original_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    document_address: {
        type: DataTypes.STRING,
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
    modelName: 'documents_master',
    underscored: true
})

export default Documents;
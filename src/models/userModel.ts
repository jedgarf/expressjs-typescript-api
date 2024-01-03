const userModel = (sequelize: any, Sequelize: any) => {
    const Users = sequelize.define("users", {
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at:{
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: true
        },
        image_file: {
            type: Sequelize.STRING,
            allowNull: true
        },
        user_code: {
            type: Sequelize.STRING,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        first_name: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        last_name: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        birth_date: {
            type: Sequelize.DATE,
            validate: {
                isDate: true,
            }
        },
        is_active: {
            type: Sequelize.BOOLEAN
        }
    });

    return Users;
};

export default userModel;
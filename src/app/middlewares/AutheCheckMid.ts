import { AppDataSource } from '../../database/data-source';
import { Users } from '../../database/entities/Users';
import { ResponseUtil } from '../../utils/Response';
import { Roles } from '../../constants/Role';

const check = async (req: any, res, next) => {
    const { idUser } = req.user
    const user = await AppDataSource.manager.getRepository(Users).findOne({
        where: {
            id: idUser
        },
        relations: ['author']
    })
    if (user!.role == Roles.ADMIN) {
        return ResponseUtil.sendErrror(res, "Unauthorized", 403, null);
    }
    req.userA = user
    next()
};

export = check;
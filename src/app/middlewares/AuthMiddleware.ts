import { ResponseUtil } from '../../utils/Response';
import {verify} from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return   ResponseUtil.sendErrror(res, "Missing access token", 401, null) 
    verify(token, 'my_secret_key', (err, decoded) => {
      if (err) return   ResponseUtil.sendErrror(res, "Invalid access token", 403, null) 
      req.user = { id: decoded.userId };
      next();
    });
  };
  
export = verifyUser;
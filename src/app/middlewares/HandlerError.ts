import { ResponseUtil } from "../../utils/Response";
import { NextFunction, Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
export class ErrorHandler {
    static catchErrors(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
    static handleErrors(err : any,req:Request, res:Response, next : NextFunction){

        if(err instanceof EntityNotFoundError){
          return ResponseUtil.sendErrror(res,"Item/page you are looking for does not exist", 404,null);
        }
        else 
        if(err instanceof QueryFailedError){
          return ResponseUtil.sendErrror(res,"Error for   Duplicate", 422,null);
        }
        return res.status(500).json({
          success : false,
          massage : "Something went wrong"
        })
      }
}
import { NestMiddleware, HttpStatus, HttpException, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from "jsonwebtoken"
import { jwtSecret } from "config/jwt.secret";
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor (private readonly administratorService: AdministratorService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    
    if (!req.headers.authorization) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED)
    }
    
    const tokenParts = req.headers.authorization.split(' ')

    if (tokenParts.length !== 2) {
      throw new HttpException('Token does not exist!', HttpStatus.UNAUTHORIZED)
    }

    const token = tokenParts[1]
    let jwtData: JwtDataAdministratorDto

    try {

      jwtData = jwt.verify(token, jwtSecret)

    } catch (e) {

      throw new HttpException('Token is not valid!', HttpStatus.UNAUTHORIZED);
      
    }

    if (!jwtData) {
      throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED)
    }

    if (jwtData.ip !== req.ip) {
      throw new HttpException('Bad ip address', HttpStatus.UNAUTHORIZED)
    }

    if (jwtData.ua !== req.headers['user-agent']) {
      throw new HttpException('Bad user agent', HttpStatus.UNAUTHORIZED)
    }

    const administrator = await this.administratorService.getById(jwtData.administratorId)

    if (!administrator){
      throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED)
    }
    
    const currentTime = new Date().getTime() / 1000

    if (currentTime >= jwtData.exp) {
      throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED)
    }

    next()
  }

}
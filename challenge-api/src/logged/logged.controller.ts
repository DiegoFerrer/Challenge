import { Controller, Res, Get, HttpStatus,Headers, Post, Body  } from '@nestjs/common';
import * as config from "config";
import { UserDto } from './dto/user.dto';

@Controller('login')
export class LoggedController {

  @Post()
  login(@Res() response,@Body() body:UserDto){
    const userSimulated = config.get('userSimulated')
    const passwordSimulated = config.get('passwordSimulated')
    const {user,password} = body

    if(user == userSimulated && password == passwordSimulated){
      const token = config.get('simulatedToken')
      return response.status(HttpStatus.OK).json({token});
    }
    return response.status(HttpStatus.UNAUTHORIZED).json({message:'UNAUTHORIZED'})
  }     
  
  @Get('/isLogged')
  isLogged(@Res() response, @Headers() headers) {
    const simulatedToken = config.get('simulatedToken')
    const token = headers.authorization
    
    if(token == simulatedToken) return response.status(HttpStatus.OK).json({ message: 'Valid Token' });

    return response.status(HttpStatus.UNAUTHORIZED).json({message:'Invalid Token'});

  }
}

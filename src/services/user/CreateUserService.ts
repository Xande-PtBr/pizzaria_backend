import prismaClient from '../../prisma';
import { hash } from 'bcryptjs'; 

interface UserRequest{
    name: string;
    email: string;
    password: string;   
}
class CreateUserService{
    async execute({ name, email, password }: UserRequest) {

      //verificar se o usuario enviou o email
    if(!email){
      throw new Error("Dados invalido")
    }

    const passwordHash = await hash(password, 8);
    
    //verificar se o email ja esta cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })


    //se o email ja estiver cadastrado, lancar um erro
    if(userAlreadyExists){
      throw new Error("Usuario já esta cadastrado na plataforma")
    }
     //criar o usuario
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })


    return user;
  }
}

export { CreateUserService }
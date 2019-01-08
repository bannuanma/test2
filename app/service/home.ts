import { Service, Context } from 'egg'
import { GreetingModel } from '../model'

export default class Home extends Service {
  constructor(ctx: Context) {
    super(ctx)
  }
// -----------------------------------查--------------------------------------
  public async greet({ name }: { name: string }): Promise<string> {

    const { app } = this
    const greetingRepository  = app.typeorm.getRepository(GreetingModel)
    const user = await greetingRepository.findOne({
      name
    })
    if (!user) {
      // console.log(greeter.id)
      return 'Hello Anonymous'
    }

    return `Hello ${user.greeting}`
  }
// ------------------------------------删--------------------------------------
public async delete(name: string) {

  const { app } = this
  const greetingRepository  = app.typeorm.getRepository(GreetingModel)
  if (greetingRepository.findOne({
    name})) {
      const deUser = new GreetingModel()
      deUser.name = name
      await greetingRepository.remove(deUser)
      console.log(deUser)
      return ` ${name} 删除成功~ `
  }else {
    return ` ${name} 不存在~ `}
}
/*
// ------------------------------------增--------------------------------------
  public async insert1({name}: { name: string}): Promise<string> {

    const { app } = this
    const greetingRepository  = app.typeorm.getRepository(GreetingModel)
    const user = new GreetingModel()
    user.name = name
    user.greeting = 'hi'
    await greetingRepository.save(user)
    return ` ${user.greeting} ${user.name} 欢迎你的加入~ `
  }
*/

// ------------------------------------增--------------------------------------
public async insert({name}: { name: string}): Promise<string> {

  const { app } = this
  const greetingRepository  = app.typeorm.getRepository(GreetingModel)
  const newUser = new GreetingModel()
  newUser.name = name
  newUser.greeting = 'hi'
  await greetingRepository.insert(newUser)
  await greetingRepository.save(newUser)
  console.log(newUser)
  return ` ${newUser.greeting} ${newUser.name} 欢迎你的加入~ `
}

// -----------------------------------改--------------------------------------
public async modify( name: string, greet: string){
  const { app } = this
  const greetingRepository  = app.typeorm.getRepository(GreetingModel)
  const findUser = await greetingRepository.findOne({
    name
  })
  if (findUser) {
    findUser.greeting = greet
    await greetingRepository.save(findUser)
    return ` ${greet} ${findUser.name} 您的greeting更新了哟~ `
  }else {
    return `Sorry,用户不存在~ `
  }
}

  public async isAdmin({ name }: { name: string}): Promise<boolean> {
    const { app } = this
    if (app.config.admin.includes(name)) {
      return true
    }
    return false
  }
}

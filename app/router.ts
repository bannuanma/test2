import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  // 判断系统是否存活的接口
  router.get('/alive', controller.home.alive)

  // home
  router.get('/home/greet', controller.home.greet)
  router.get('/home/isAdmin', controller.home.isAdmin)
  router.post('/home/insert', controller.home.insert)
  // router.post('/home/insert1', controller.home.insert1)
  router.delete('/home/delete', controller.home.delete)
  router.put('/home/modify', controller.home.modify)
}

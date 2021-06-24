module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      //所有的异常都在app上出发一个error事件，记录报错日志
      ctx.app.emit("error", err, ctx);
      ctx.status = err.status;
      if(ctx.status === 422){
        return ctx.body = {
            msg:'fail',
            data:err.errors
        }
      }else{
          ctx.body = {
            msg: "fail",
            data: err.message,
          };
      }
    }
  };
};

"use strict";
module.exports = (app) => {
  class Controller extends app.Controller {
    //用户列表接口
    async list() {
      //获取数据
      let result = [];

      this.ctx.throw(500, "故意出错");
      let page = this.ctx.query.current ? parseInt(this.ctx.query.current) : 0;
      let limit = this.ctx.query.size ? parseInt(this.ctx.query.size) : 10;
      let offset = (page - 1) * 5;
      //查询列表数据
      let Op = this.app.Sequelize.Op;

      result = await this.app.model.User.findAndCountAll({
        where: {
          // username: {
          //   [Op.like]: "%用户%",
          // },
        },
        //设置查询返回字段
        // attributes:['id','username','sex']
        //排除查询返回字段
        attributes: {
          exclude: ["password"],
        },
        //排序
        order: [
          ["id", "DESC"],
          ["created_at", "DESC"],
        ],
        //分页
        limit,
        offset,
      });

      //查询多个并计数
      // result = await this.app.model.User.findAndCountAll();
      //拿到url参数
      this.ctx.body = {
        msg: "ok",
        data: result,
      };
    }
    //读书用户数据
    async read() {
      let id = parseInt(this.ctx.params.id);

      const { app } = this;
      //通过主键查询单个数据
      // const detail = await app.model.User.findByPk(id);
      // if(!detail){
      //   return this.ctx.body = {
      //     msg:"fail",
      //     data:"用户不存在"
      //   }
      // }
      //查询单个
      let detail = await app.model.User.findOne({
        where: {
          id,
        },
      });
      this.ctx.body = {
        msg: "ok",
        data: detail,
      };
    }
    //创建用户
    async create() {
      //参数验证
      const ctx = this.ctx;
      const params = ctx.request.body;

      this.ctx.validate({
        username: {
          type: "string",
          required: true,
          desc: "用户名",
        },
        password: { type: "string", required: true, desc: "密码" },
        sex: { type: "string", required: false, defValue: "男", desc: "性别" },
      });
      //抛出异常
      //单行数据新增
      const user = await this.app.model.User.create(params);
      //批量新增
      // let user = await this.app.model.User.bulkCreate([]);
      //成功
      this.ctx.body = { user };
    }
    async update() {
      //取参数
      let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
      let data = await this.app.model.User.findByPk(id);
      // if(!data){
      //   return this.ctx.body = {
      //     msg:"fail",
      //     data:"记录不存在"
      //   }
      // }
      // data.username = '被修改';
      // data.sex = '男'
      // let res = await data.save({
      //   fields:['username']
      // });

      let body = this.ctx.request.body;
      let res = await data.update(body, {
        fields: ["username"],
      });

      this.ctx.body = {
        msg: "ok",
        data: res,
      };
    }
    async destroy() {
      //删除单个
      // let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;

      // let data = await this.app.model.User.findByPk(id);
      // if (!data) {
      //   return (this.ctx.body = {
      //     msg: "fail",
      //     data: "该记录不存在",
      //   });
      // }

      // let res = await data.destroy();
      // this.ctx.body = {
      //   msg: "ok",
      //   data: res,
      // };

      /**
       * 批量删除
       */
      let Op = this.app.model.Sequelize.Op;
      let res = await this.app.model.User.destroy({
        where: {
          id: {
            [Op.lte]: 7,
          },
        },
      });
      this.ctx.body = {
        msg: "ok",
        data: res,
      };
    }
  }

  return Controller;
};

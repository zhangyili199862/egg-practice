/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1579788120104_5194";

  // add your middleware config here
  config.middleware = ["errorHandler"];

  config.errorHandler = {
    // 通用配置（以下是重点）
    // enable:true, // 控制中间件是否开启。
    // match:'/user/list', // 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
    // ignore:'/shop', // 设置符合某些规则的请求不经过这个中间件。
    /**
        注意：
        1. match 和 ignore 不允许同时配置
        2. 例如：match:'/news'，只要包含/news的任何页面都生效
        **/
    // match 和 ignore 支持多种类型的配置方式：字符串、正则、函数（推荐）
    // match(ctx) {
    //     // 只有 ios 设备才开启
    //     const reg = /iphone|ipad|ipod/i;
    //     return reg.test(ctx.get('user-agent'));
    // },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 关闭csrf开启跨域
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["http://localhost:8080"],
  };
  config.cors = {
    origin: "*", // 匹配规则  域名+端口  *则为全匹配
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };
  //数据库config
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: "root",
    port: 3306,
    database: "eggapi",
    // 中国时区
    timezone: "+08:00",
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      // deletedAt: "deleted_at",
      // 所有驼峰命名格式化
      underscored: true,
    },
  };
  config.valparams = {
    locale: "zh-cn",
    throwError: true,
  };
  return {
    ...config,
    ...userConfig,
  };
};

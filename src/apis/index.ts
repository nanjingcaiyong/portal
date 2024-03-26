import { createAxios } from 'rich-axios';
const eagerImportModules = import.meta.glob('./*.ts', { eager: true }) as any;

/**
 * @description 模块路径转模块名
 * @param modulePath 模块路径
 * @returns 
 */
const toModuleName = (modulePath) => /(?<=\/)[a-zA-Z]+(?=.ts)/.exec(modulePath)?.[0] || '';

/**
 * @description 组装api
 * @param modulePath 模块路径
 * @returns 
 */
const groupApi = (modulePath: string) => {
  return eagerImportModules[modulePath].default.reduce((api, config) => {
    const isGetMethod = config.type.toUpperCase() === 'GET';
    const url = process.env.AUTH + config.path;
    return Object.assign({}, api, {
      [config.name]: (obj, resetConfig) => {
        const params = Object.assign({}, obj, resetConfig);
        return instance[config.type](url, isGetMethod ? {params} : params);
      }
    });
  }, {});
};

const apis = Object.keys(eagerImportModules).reduce((module, modulePath) =>{
  const moduleName = toModuleName(modulePath);
  return Object.assign({}, module, {[moduleName]: groupApi(modulePath)});
}, {});


const instance = createAxios({
  timeout: 5000
});


export default apis;
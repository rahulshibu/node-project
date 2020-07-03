const messageUtil = require('../../utilities/message');
const passwordUtil = require('../../utilities/password');
const responseUtil = require('../../utilities/response');
const s3 = require('../../utilities/s3');
const userService = require('./userService')
const Sequelize = require('sequelize');
const mail = require('../../utilities/mail');
const template = require('../../utilities/emailTemp');

const Op = Sequelize.Op;
const config = require('./../../config/index');

exports.register= async (req,res,next) =>{
    try {
        let emailCheck = await userService.getUser({email:req.body.email})
        if (emailCheck)
            return responseUtil.badRequestErrorResponse(res, messageUtil.emailExist);

        let phoneCheck = await userService.getUserByPhone({phone:req.body.phone})
        if (phoneCheck)
            return responseUtil.badRequestErrorResponse(res, messageUtil.phoneExist);

        let password = await passwordUtil.generateHash(req.body.password);
        let image = s3.uploadFile(req.files.image,'User')

        let data = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:password,
            profilePic:image.url,
        }
        await userService.create(data);
        await mail.sendMail(data.email,'Node JS Registration','',template.registration(data.name));

        responseUtil.successResponse(res, messageUtil.registerSuccess);
    }catch (e) {
        responseUtil.serverErrorResponse(res, e);
    }
}

exports.profile= async (req,res,next) =>{
    try {

        let result = await userService.getUser({id:req.userData.id})

        responseUtil.successResponse(res, messageUtil.success,result);
    }catch (e) {
        responseUtil.serverErrorResponse(res, e);
    }
}
exports.getUserList= async (req,res,next) =>{
    try {
        let limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        let page = req.query.page ? parseInt(req.query.page, 10) : 1;
        let search = req.query.search;
        let skip = limit * (page - 1);
        let where ={
            name: {
                [Op.substring]: '%' + search + '%',
            },
            role:{[Op.ne]:config.USERS.ADMIN}
        };
        let total = await userService.countUsers(where)
        let data = await userService.getAllUser({ limit, skip,where })

        responseUtil.successResponse(res, messageUtil.success, {data:data,total:total});
    }catch (e) {
        responseUtil.serverErrorResponse(res, e);
    }
}


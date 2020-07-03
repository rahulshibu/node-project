'use strict';

const config = require('../../config');
const responseUtil = require('../../utilities/response');
module.exports.imageValidate = (req, res, next) => {
    let errors = [];
    if (!req.files || !req.files.image ){
        let errorData = {
            value: "",
            msg: 'Image cannot be left blank',
            param: 'image',
            location: 'body',
        };
        errors.push(errorData);
        return responseUtil.validationErrorResponse(res, errors);
        }
    let imageFile = req.files.image;

    if (imageFile.size > config.IMAGE.SIZE) {
        let errorData = {
            value: imageFile.size,
            msg: 'Image size exceeds the maximum limit',
            param: 'image',
            location: 'body',
        };
        errors.push(errorData);
        return responseUtil.validationErrorResponse(res, errors);
    }
    let mimeTypes = config.IMAGE.MIME_TYPE;
    let mimeStatus = mimeTypes.includes(imageFile.mimetype);
    if (!mimeStatus) {
        let errorData = {
            value: imageFile.mimetype,
            msg: 'Upload a valid image',
            param: 'image',
            location: 'body',
        };
        errors.push(errorData);
        return responseUtil.validationErrorResponse(res, errors);
    }
    next();

};



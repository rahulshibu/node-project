const S3FS = require('s3fs');
const uuid = require('uuid');
const path = require('path');


module.exports.uploadFile = async (file, folder) => {
  try {
    let mimeType = file.mimetype;
    let directory = `${folder}`;
    let fileName = uuid.v4();
    let fileType = path.extname(file.name);
    let fileNameWithExtension = fileName+fileType;
    let data = file.data;
    let s3 = new S3FS(process.env.BUCKET_NAME + '/' + directory, {
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
    let response = await s3.writeFile(fileNameWithExtension, data);
    console.log(response)
    if (response){
      return ({
        url: `${directory}/${fileName}${fileType}`,
        name: `${fileName}${fileType}`,
        success: true,
        data: response,
      });
    } else {
      return false;
    }
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error',
    });
    return false;
  }
};
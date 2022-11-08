import { randomId } from "./useful-functions.js";

const s3BucketName = "azkaban-19";
const bucketRegion = "ap-northeast-2";
const IdentityPoolId = "ap-northeast-2:cf51ca42-f9ff-4479-a05f-28ce8d0684b5";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: "2012-10-17",
  params: { Bucket: bucketRegion },
});

async function addImageToS3(fileInputElement, album) {
  const files = fileInputElement.files;
  if (!files.length) {
    throw new Error("사진 파일을 업로드해 주세요.");
  }

  const file = files[0];

  const fileName = randomId() + "_" + file.name;
  const albumPhotosKey = encodeURIComponent(album) + "/";
  const photoKey = albumPhotosKey + fileName;

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: s3BucketName,
      Key: photoKey,
      Body: file,
    },
  });

  try {
    const uploadedFile = await upload.promise();

    const fileKey = uploadedFile.Key;
    console.log(
      `AWS S3에 정상적으로 사진이 업로드 되었습니다. \n 파일 위치 : ${fileKey}`
    );

    return fileKey;
  } catch (err) {
    throw new Error(
      `S3에 업로드하는 과정에서 에러가 발생하였습니다. \n${err.message}`
    );
  }
}

function getImageUrl(imageKey) {
  const imageUrl = new Promise((resolve) => {
    const params = {
      Bucket: s3BucketName,
      Key: imageKey,
      Expires: 60,
    };

    s3.getSignedUrl("getObject", params, (_, url) => {
      resolve(url);
    });
  });

  return imageUrl;
}

export { addImageToS3, getImageUrl };

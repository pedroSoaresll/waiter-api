const AWS = require('aws-sdk');

export default () => {
  AWS.config = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
  };

  return AWS;
}

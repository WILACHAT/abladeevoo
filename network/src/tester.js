import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({ 
    cloud_name: 'ablaze-project', 
    api_key: '482793736787258', 
    api_secret: 'LROKHkhMt9OEq2ZjSLwR7R6ykXg',
    secure: true
  });

console.log("lol")
require("dotenv").load();
var cloudinaryy = require('cloudinary');

console.log(cloudinaryy)


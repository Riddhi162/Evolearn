const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dcckdpctq',
    api_key: '927769325618362',
    api_secret: 'KsFF8lAYzy4KdOD6Pt-4Jgd49r0',
});

cloudinary.uploader.ping()
    .then(result => {
        console.log("Cloudinary is reachable:", result);
    })
    .catch(error => {
        console.error("Error reaching Cloudinary:", error);
    });

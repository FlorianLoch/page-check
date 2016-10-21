const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

let imageDir; // Gets set via exported function

const schema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    interval: {
        type: Number,
        required: true
    },
    nextScan: {
        type: Date, 
        default: Date.now
    },
    offset: {
        top: {
            type: Number,
            required: true
        },
        bottom: {
            type: Number,
            required: true
        }
    },
    clip: {
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    mail: {
        type: String,
        required: true
    },
    threshold: {
        type: Number,
        required: true
    }
});

schema.methods.openImageWriteStream = function () {
    return fs.createWriteStream(path.join(imageDir, this.id), {
        defaultEncoding: "binary"
    });
};

schema.methods.openImageReadStream = function () {
    return fs.createReadStream(path.join(imageDir, this.id), {
        defaultEncoding: "binary"
    });
};

module.exports = (imageDirParam) => {
    imageDir = imageDirParam;
    return mongoose.model("Webpage", schema);
};
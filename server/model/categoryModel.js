const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        // required: true

    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    reviews:
        [{
            user: String,
            comment: String
        }],

    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    }]
});
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    videos: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        },
    ],
});
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: Array,
        required: true,
    },

    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    }
});




const categoryModel = mongoose.model("Category", categorySchema);
const subcategoryModel = mongoose.model("Subcategory", subcategorySchema);
const videoModel = mongoose.model("Video", videoSchema);




module.exports = { categoryModel, subcategoryModel, videoModel };

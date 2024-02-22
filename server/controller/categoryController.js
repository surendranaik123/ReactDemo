const { categoryModel, subcategoryModel, videoModel } = require("../model/categoryModel");


// get category
const category = async (req, res) => {
    try {
        const categories = await categoryModel.find().populate('subcategories');
        res.header("Access-Control-Allow-Origin");
        res.json(categories);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

// add category and subcategory
const catsub = async (req, res) => {

    try {

        const { name, image, price, description, reviews, subcategories } = req.body;


        const category = new categoryModel({
            name, image, price, description, reviews,
            subcategories: [],
        });


        await category.save();
        const newSubcategories = [];
        for (const subcategoryName of subcategories) {
            const subcategory = new subcategoryModel({
                name: subcategoryName,
                videos: [],
                category: category._id
            });
            await subcategory.save();
            category.subcategories.push(subcategory);
            newSubcategories.push(subcategory);
        }
        await category.save();
        res.status(201).json({
            category,
            subcategories: newSubcategories,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
// get subcategory

const subcategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await subcategoryModel.find({ category: categoryId });

        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// get video

const video = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const videos = await videoModel.find({ subcategory: subcategoryId });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Add a new video to a subcategory
const subvideo = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const subcategory = await subcategoryModel.findById(subcategoryId);
        const video = new videoModel({
            title: req.body.title,
            url: req.body.url,
            subcategory: subcategoryId,
            category: subcategory.category
        });
        await video.save();
        subcategory.videos.push(video);
        await subcategory.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = { category, subcategory, catsub, video, subvideo };

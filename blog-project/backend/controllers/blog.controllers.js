const Joi = require("joi");
const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const isValid = Joi.object({
    title: Joi.string().required(),
    textBody: Joi.string().max(1000).required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Data Format",
      data: isValid.error,
    });
  }

  console.log(req.session);
  const blogObj = new Blog({
    title: req.body.title,
    textBody: req.body.textBody,
    userId: req.session.user.userId,
  });

  try {
    await blogObj.save();

    res.status(201).send({
      status: 201,
      message: "Blog successfuly created!",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Blog creation failed!",
    });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const userId = req.session.user.userId;
    const page = req.query.page || 1;
    const LIMIT = 10;

    // const myBlogsData = await Blog.aggregate([
    //   { $match: { userId: userId } },
    //   { $sort: { creationDateTime: -1 } },
    //   {
    //     $facet: {
    //       data: [{ $skip: (parseInt(page) - 1) * LIMIT }, { $limit: LIMIT }],
    //     },
    //   },
    // ]);

    const myBlogsData = await Blog.find(userId)
      .sort({ creationDateTime: -1 })
      .skip(parseInt(page) - 1)
      .limit(LIMIT);

    res.status(200).send({
      status: 200,
      message: "User blogs fetched successfully!",
      data: myBlogsData,
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Failed to get the blogs!",
      data: err,
    });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    await Blog.deleteOne({ _id: blogId });

    res.status(200).send({
      status: 200,
      message: "Blog has been successfully deleted!",
    });
  } catch (err) {
    res.status(400).send({
      stauts: 400,
      message: "Unable to delete the blog!",
    });
  }
};

const editBlog = async (req, res) => {
  const { blogId, title, textBody } = req.body;
  const userId = req.session.user.userId;

  try {
    const blogData = await Blog.findById(blogId);

    //compare the owner and the user making the request to edit
    if (!(blogData.userId.toString() === userId.toString())) {
      return res.status(401).send({
        status: 401,
        message: "Not allowed to edit, Authorization failed!",
      });
    }

    //compare the time, if it's in the 30 mins bracket
    const creationDateTime = blogData.creationDateTime.getTime();
    const currentDateTime = Date.now();

    const diff = (currentDateTime - creationDateTime) / (1000 * 60);

    if (diff > 30) {
      return res.status(400).send({
        status: 400,
        message: "Not allowed to edit after 30 minutes of creation!",
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Unable to edit the blog!",
    });
  }

  try {
    const newBlogData = {
      title,
      textBody,
    };

    await Blog.findOneAndUpdate({ _id: blogId }, newBlogData);

    res.status(200).send({
      status: 200,
      message: "Blog edited successfully!",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Unable to edit the blog!",
    });
  }
};

module.exports = { createBlog, getUserBlogs, deleteBlog, editBlog };

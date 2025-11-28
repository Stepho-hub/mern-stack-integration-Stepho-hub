const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for better compatibility
  fileFilter: (req, file, cb) => {
    // Define allowed image MIME types
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/svg+xml',
      'image/x-icon',
      'image/heic',
      'image/heif'
    ];

    // Define allowed file extensions
    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|tiff|tif|svg|ico|heic|heif)$/i;

    // Check MIME type first
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    }
    // Fallback to file extension check
    else if (allowedExtensions.test(file.originalname)) {
      cb(null, true);
    }
    else {
      cb(new Error('Only image files are allowed! Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP, TIFF, SVG, ICO, HEIC, HEIF'), false);
    }
  }
});

// Validation middleware
const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('excerpt')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Excerpt must be less than 200 characters'),
  body('category')
    .isMongoId()
    .withMessage('Valid category is required'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];

const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment content is required and must be less than 500 characters')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Get all posts with search and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublished: true };

    // Add category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author')
      .populate('category')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search posts (dedicated endpoint)
router.get('/search', async (req, res) => {
  try {
    const { q: searchQuery, limit = 10 } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const posts = await Post.find({
      isPublished: true,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } },
        { excerpt: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .populate('author')
      .populate('category')
      .limit(parseInt(limit));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post by ID or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    let post;
    if (mongoose.Types.ObjectId.isValid(req.params.idOrSlug)) {
      // If it's a valid ObjectId, find by ID
      post = await Post.findById(req.params.idOrSlug)
        .populate('author')
        .populate('category')
        .populate('comments.user', 'name');
    } else {
      // Otherwise, find by slug
      post = await Post.findOne({ slug: req.params.idOrSlug })
        .populate('author')
        .populate('category')
        .populate('comments.user', 'name');
    }

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post
router.post('/', auth, upload.single('featuredImage'), validatePost, handleValidationErrors, async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id,
    };

    if (req.file) {
      postData.featuredImage = req.file.filename;
    }

    const post = new Post(postData);
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update post
router.put('/:id', auth, upload.single('featuredImage'), validatePost, handleValidationErrors, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const updateData = { ...req.body };
    if (req.file) {
      updateData.featuredImage = req.file.filename;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment to post
router.post('/:id/comments', auth, validateComment, handleValidationErrors, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      user: req.user.id,
      content: req.body.content
    };

    post.comments.push(comment);
    await post.save();

    // Populate the comment with user data
    await post.populate('comments.user', 'name');

    const newComment = post.comments[post.comments.length - 1];
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Post = require('../../models/Posts');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

//@route   POST api/posts
//@desc    Create a Post
//@access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   GET api/posts
//@desc    get all posts
//@access  Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   GET api/posts
//@desc    get single post
//@access  Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Page Not Found' });
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Page Not Found' });
    }
    return res.status(500).send('Server Error');
  }
});

//@route   DELETE api/posts/:id
//@desc    Delete a post
//@access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post Not Found' });
    //Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route   PUT api/posts/like/:id
//@desc    Like a post
//@access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post Already Liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@route   PUT api/posts/unlike/:id
//@desc    Unlike a post
//@access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post is not liked' });
    }

    //Get remove index
    const removeIndex = post.likes
      .map((like) => {
        return like.user.toString();
      })
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@route   PUT api/posts/comment/:id
//@desc    Comment on a post
//@access  Private

router.put(
  '/comment/:id',
  [auth, [check('text', 'Text is Required').not().isEmpty()]],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post Not Found' });
      }

      const user = await User.findById(req.user.id).select('-password');

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();

      res.status(200).json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Delete a comment
//@access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    if (
      !post.comments.filter((comment) => {
        return comment.id.toString() == req.params.comment_id;
      })
    ) {
      return res.status(404).json({ msg: 'No comment Found' });
    }
    const removeIndex = post.comments
      .map((com) => {
        return com.id.toString();
      })
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

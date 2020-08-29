import { Router } from 'express';
import {
      fetchTweetById,
      createTweet,
      getAllUserTweets,
      likeTweet,
      deleteTweet,
      getAllTweets,
      viewComments,
      createComment,
      deleteComment,
} from '../controllers/tweets';
import { isSignedIn, fetchUserById } from '../controllers/auth';
import { body } from 'express-validator';

const router = Router();

router.param('tweetId', fetchTweetById);
router.param('userId', fetchUserById);

router.get('/:pageNo', isSignedIn, getAllTweets);
router.get('/user-tweets/:userId', isSignedIn, getAllUserTweets);

router.post('/:userId', [body('content', 'This tweet is invalid').isString()], isSignedIn, createTweet);

router.patch('/:tweetId', isSignedIn, likeTweet);
router.delete('/:tweetId/:userId', isSignedIn, deleteTweet);

router.get('/:tweetId/comments', isSignedIn, viewComments);
router.post('/:tweetId/:userId/new-comment', isSignedIn, [body('comment', 'This comment is invalid').isString()], createComment);
router.delete('/:tweetId/:userId/delete-comment/:commentId/', isSignedIn, deleteComment);

export default router;

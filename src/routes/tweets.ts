import { Router } from 'express';
import {
      fetchTweet,
      createTweet,
      getAllUserTweets,
      likeTweet,
      deleteTweet,
      getAllTweets,
      viewComments,
      createComment,
      deleteComment,
} from '../controllers/tweets';
import { isSignedIn } from '../controllers/auth';
import { body } from 'express-validator';

const router = Router();

router.param('tweetId', fetchTweet);

router.get('/', isSignedIn, getAllTweets);
router.get('/user-tweets', isSignedIn, getAllUserTweets);

router.post('/', [body('content', 'This tweet is invalid').isAlphanumeric()], isSignedIn, createTweet);

router.patch('/:tweetId', isSignedIn, likeTweet);
router.delete('/:tweetId', isSignedIn, deleteTweet);

router.get('/:tweetId/comments', isSignedIn, viewComments);
router.post('/:tweetId/new-comment', [body('comment', 'This comment is invalid').isAlphanumeric()], isSignedIn, createComment);
router.delete('/:tweetId/delete-comment/:commentId', isSignedIn, deleteComment);

export default router;

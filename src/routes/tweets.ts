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

const router = Router();

router.param('tweetId', fetchTweet);

router.get('/', getAllTweets);

router.get('/user-tweets', getAllUserTweets);
router.post('/', createTweet);
router.patch('/:tweetId', likeTweet);
router.delete('/:tweetId', deleteTweet);

router.get('/:tweetId/comments', viewComments);
router.post('/:tweetId/new-comment', createComment);
router.delete('/:tweetId/delete-comment/:commentId', deleteComment);

export default router;

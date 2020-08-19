import { Request } from 'express';

export default interface RequestCustom extends Request {
      user?: any;
      tweet?: any;
      auth?: any;
}

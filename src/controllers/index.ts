import * as authControllers from './authControllers';
import * as userControllers from './userControllers';

const combinedControllers = {
  auth: authControllers,
  users: userControllers,
  // Add more route sections as needed
};

export default combinedControllers;
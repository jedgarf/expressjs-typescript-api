import usersRoutes from './userRoutes';
import authRoutes from './authRoutes';

const combinedRoutes = {
  users: usersRoutes,
  auth: authRoutes
};

export default combinedRoutes;
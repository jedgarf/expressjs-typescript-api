// Allow requests from a specific domain
const allowedOrigins: string = process.env.ALLOWED_ORIGIN || '';
const allowedOriginsArray: string[] = allowedOrigins.split(',');

type corsConfigTypes = {
    origin: (origin: any, callback: any) => void;
    methods: string;
    optionsSuccessStatus: number;
}

 const corsConfig: corsConfigTypes = {
    origin: (origin: string, callback: any) => {
      if (process.env.NODE_ENV === 'PRODUCTION') {
        if (allowedOriginsArray.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      } else {
        callback(null, true);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

export default corsConfig;
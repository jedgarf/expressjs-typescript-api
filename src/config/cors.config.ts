// Allow requests from a specific domain
const allowedOrigins: string[] = JSON.parse(process.env.ALLOWED_ORIGIN || '');

 const corsConfig: any = {
    origin: function (origin: string, callback: any): void {
      if (process.env.NODE_ENV === 'PRODUCTION') {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
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
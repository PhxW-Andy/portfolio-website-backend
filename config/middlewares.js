module.exports = [
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "blob:",
            "cdn.jsdelivr.net",
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "res.cloudinary.com",
            "https://portfolio-website-strapi-cms.herokuapp.com/",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "res.cloudinary.com",
            "https://portfolio-website-strapi-cms.herokuapp.com/",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

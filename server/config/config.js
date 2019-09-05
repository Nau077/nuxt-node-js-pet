const port = process.env.PORT || 4000;

const mongoURI = 'mongodb://localhost:27017/schastie-db'

const jwt = {
    secret: 'schastie077',
    tokens: {
        access: {
            type: 'access',
            expireIn: '2m'
        },
        refresh: {
            type: 'refresh',
            expireIn: '300m'
      }
    }
  }

const jwtAdmin = {
    secret: 'schastie777admin',
    tokens: {
        access: {
            type: 'access',
            expireIn: '2m'
        },
        refresh: {
            type: 'refresh',
            expireIn: '300m'
      }
    }
}

const jwtEmail = {
    secret: 'schastiesend777',
    expireIn: '1d'
}

module.exports = {
    port,
    mongoURI,
    jwt,
    jwtAdmin,
    jwtEmail
}
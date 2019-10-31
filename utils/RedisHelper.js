const Redis = require("ioredis");
class RedisHelper {
  constructor(redisURI) {
    try {
      this.client = new Redis(redisURI);
    } catch (e) {
      console.error(e);
      process.exit(4);
    }
  }
  addRevokedTokenJTI(email, jti) {
    return new Promise(async (resolve, reject) => {
      try {
        const jtis = await this.getRevokedTokenJTIs(email);
        if (jtis) {
          const newValue = jtis + ":" + jti;
          this.client.set(email, newValue);
          return resolve("Added");
        } else {
          this.client.set(email, jti);
          return resolve("Added");
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
  getRevokedTokenJTIs(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const jtis = await this.client
          .pipeline()
          .get(email)
          .exec();
        const [_, value] = jtis[0];
        return resolve(value);
      } catch (e) {
        return reject(e);
      }
    });
  }
  isRevoked(email, jti) {
    return new Promise(async (resolve, reject) => {
      try {
        const jtis = await this.getRevokedTokenJTIs(email);
        if (jtis) {
          const jtisplit = jtis.split(":");
          if (jtisplit.includes(jti)) return resolve(true);
          else return resolve(false);
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
}

const { REDIS_URI } = process.env;
module.exports = new RedisHelper(REDIS_URI);

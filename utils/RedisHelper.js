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
        let jtis = await this.getRevokedTokenJTIs(email);
        if(jtis.includes(jti))
            return resolve("Already Added");
        else {
            jtis.push(jti)
        }
        this.client.set(email,JSON.stringify(jtis));
        return resolve("Added");
      } catch (e) {
        return reject(e);
      }
    });
  }
  getRevokedTokenJTIs(email) {
    return new Promise( async (resolve, reject) => {
      try {
        const jtis = await this.client
          .pipeline()
          .get(email)
          .exec();

        const [_, value] = jtis[0];
        if(value) {
            return resolve(JSON.parse(value));
        } else {
            return resolve([]);
        }
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
          if (jtis.includes(jti)) return resolve(true);
          else return resolve(false);
        } else return resolve(false);
      } catch (e) {
        return reject(e);
      }
    });
  }
}

const { REDIS_URI } = process.env;
module.exports = new RedisHelper(REDIS_URI);

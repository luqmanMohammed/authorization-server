class JWTHelper {
    createToken({email,role},secret) {
        return token = jwt.sign({
            email,
            role
        },secret,{
            expiresIn: "3h",
            jwtid: Math.random()
        });
    }
}

module.exports = new JWTHelper();


const authConfig = () => {
    const expires = process.env.AUTH_EXPIRES || "24h";
    const rounds = process.env.AUTH_ROUNDS || 10;
    const secret = process.env.AUTH_SECRET || "francisco";
}

export default authConfig

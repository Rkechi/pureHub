import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/purehive';

if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variables inside .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
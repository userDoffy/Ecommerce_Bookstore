import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['Admin', 'User'] },
        Otp: { type: String, default: '' },
        OtpExpireAt: { type: Number, default: 0 },
        isAccountVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);

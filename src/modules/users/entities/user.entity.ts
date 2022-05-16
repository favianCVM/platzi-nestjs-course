import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({ required: true })
	role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.methods.toJSON = function () {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { __v, password, ...user } = this.toObject();

//   return user;
// };

// UserSchema.pre('save', async function (next: HookNextFunction) {
//   const user = this as User;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   // Random additional data
//   const salt = await bcrypt.genSalt(10);

//   const hash = await bcrypt.hash(user.password, salt);

//   // Replace the password with the hash
//   user.password = hash;

//   return next();
// });

// export UserSchema

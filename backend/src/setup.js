import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from './models.js'
import { randomBytes } from 'node:crypto'
await mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/nia_auto')
const exists=await User.exists({role:'superadmin'})
if(exists){console.log('Superadmin already exists. No changes made.');process.exit(0)}
const password=randomBytes(12).toString('base64url')
await User.create({loginName:'superadmin',displayName:'Superadmin',role:'superadmin',passwordHash:await bcrypt.hash(password,12),mustChangePassword:true})
console.log('\nFIRST-TIME SUPERADMIN CREDENTIALS (save now; never stored as plaintext)')
console.log('Username: superadmin\nPassword: '+password+'\n')
await mongoose.disconnect()

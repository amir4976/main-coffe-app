import ConnectToDb from '../../configs/db';
import userModel from '../../models/User'
import { verifyToken } from './auth';
const cookies = require('next/headers')


export const authUser = async () => {
    await ConnectToDb()
    const AccessToken = cookies.cookies().get('Token')?.value
    let user = null
    if(AccessToken){
      const tokenPayload = await verifyToken(AccessToken)
      if(tokenPayload){
        user = await userModel.findOne({email:tokenPayload.email})
      }
    }
    return user
}

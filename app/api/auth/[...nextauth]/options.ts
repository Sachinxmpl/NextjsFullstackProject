import { connectDb } from "../../../../lib/conectDb";
import UserModel from "@/models/models";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials provider",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter email ",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDb();
        try {
                    const user = await UserModel.findOne({
                        email: credentials.email,
                    });
                    if(!user){
                        throw new Error ("No user fouund with given email ")
                    }

                    if(!user.isVerified){
                            throw new Error ("User is not verified yet ")
                    }
                    const password = String(user.password)
                    const isPasswordMatched = await bcrypt.compare(credentials.password , password);

                    if(!isPasswordMatched){
                        throw new Error ("Invalid password ")
                    }
                    return user 
        }
         catch (e) {
                    return null;
        }
      },
    }),
  ], 
  secret : process.env.AUTH_SECRET,
//   pages : {
//     signIn : "/signin"
//   } , 
callbacks : {
    async jwt({token , user} : any){
        if(user){
            token.uid = user.id
        }
        return token 
    } , 
    async session({session , token } : any){
        if (session.user) {
            session.user.id = token.uid
        }
        return session
    }
}

};

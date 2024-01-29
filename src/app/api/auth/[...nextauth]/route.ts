import NextAuth from "next-auth/next"
import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"

type CombinedUser = User & CredentialsProps;

interface CredentialsProps{
    id: string,
    email: string,
    password:string,
    name: string,
    role: string,
}

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<CredentialsProps | null> {
                const user: CredentialsProps = {
                    id: "1",
                    email: "ulisses@email.com",
                    password: "123456",
                    name: 'Ulisses',
                    role: 'admin'
                }

                const isValidEmail = user.email === credentials?.email
                const isValidPassword = user.password === credentials?.password
                if (isValidEmail && isValidPassword) {
                    return user;
                }
                return null;
            },

            }
        )
    ],
    callbacks:{
        jwt: ({token, user}:{token: JWT, user: User}) =>{

            if(user){
                return {
                    ...token,
                    role: (user as CombinedUser).role  
                }
            }

            return token;
        },
        session: async({session, token}) =>{
            return {
                ...session,
                user:{
                    ...session.user,
                    role: token.role
                }
            };
        }
    },
    pages:{
        signIn: "/auth/login",
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
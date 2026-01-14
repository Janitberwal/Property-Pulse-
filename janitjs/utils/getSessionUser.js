import { authOptions } from "@/utils/authoptions"
import { getServerSession } from "next-auth/next"

export async function getSessionUser() {
    
  const session = await getServerSession(authOptions)

  if(!session || !session.user){
     console.log("❌ No session or user found");
    return null;
  }
  //console.log("✅ Session found:", session);
  return{
    user:session.user,
    userId:session.user.id
  };
}
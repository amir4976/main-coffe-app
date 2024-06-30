import { cookies } from "next/headers";


export function POST(){
        cookies().delete('Token')    
        return Response.json('you logged out')
}

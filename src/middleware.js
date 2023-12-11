import { NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";
import { afterLogin } from "./middlewares/afterLogin";

export function mainMiddleware(req) {
    const res =  NextResponse.next()
    return res
}

export default withAuth(afterLogin(mainMiddleware,["/login"]),["/","/trash"])
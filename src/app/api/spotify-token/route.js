import { NextResponse } from 'next/server';

export async function POST(request) {
    const { code } = await request.json();
    
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64")}`,
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        }),
    });

    const data = await response.json();
    return NextResponse.json(data);
}
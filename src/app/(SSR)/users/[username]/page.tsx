import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from "@/components/bootstrap";

interface UserPageProps {
    params: { username: string },
}

async function getUser(username: string): Promise<UnsplashUser> {
    /*  Even though this function calls the unsplash api everytime, 
        NextJS will only call it once and use the output for the subsequent calls 
        This only works automatically with the fetch().

        If using another way of calling apis:     
            Create a wrapped for the function that uses cache:
            const getUserCached = cache(getUser);
    */
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    if (response.status === 404) notFound();
    return await response.json();
}

// const getUserCached = cache(getUser);

export async function generateMetadata({ params: { username } }: UserPageProps):Promise<Metadata> {
    const user = await getUser(username);

    return {
        title: ([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username) + " - NextJS 13.4 Image Gallery Demo",
    }
}

export default async function UserPage({ params: { username } }: UserPageProps) {
    const user = await getUser(username);

    return(
        <div>
            <Alert>
                This profile page uses <strong>generateMetadata</strong> to set the page title dynamically from the API response.
            </Alert>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
        </div>
    );
}
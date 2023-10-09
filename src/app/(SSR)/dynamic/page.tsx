import { Alert } from "@/components/bootstrap";
import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: 'Dynamic Fetching - NextJS 13.4 Image Gallery Demo',
}

export const revalidate = 0;

export default async function DynamicPage() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
        /* The below configuration is the same as the revalidate = 0 above, except it's on the level of a single request 
        */
        // {
        //     next: { revalidate: 0 }
        // }
    );
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column algin-items-center">
            <Alert>
                This page <strong>fetches data dynamically</strong>.
                <br />
                On every refresh, a new image is fetched from the Unsplash API.
            </Alert>
            <Image src={image.urls.raw} width={width} height={height} alt={image.description} className="rounded shadow mw-100 h-100" />
            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    );
}
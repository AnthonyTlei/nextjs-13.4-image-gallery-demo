import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

/* To get new images on every refresh */
// export const revalidate = 0;

/* This will only allow the topics defined as static params to be accessed (japan, coding) */
// export const dynamicParams = false;

interface TopicsPageProps {
    params: { topic: string };
    // searchParams: { [key: string]: string | string[] | undefined },
}

export function generateMetadata({params : {topic}} : TopicsPageProps): Metadata {
    return {
        title: topic + ' - NextJS 13.4 Image Gallery Demo'
    }
}

export function generateStaticParams() {
    return ["japan", "coding"].map(topic => ({ topic }));
}

export default async function TopicsPage({
    params: { topic },
}: TopicsPageProps) {
    const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const images: UnsplashImage[] = await response.json();
    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time.
                <br />
                Even though the URL has a dynamic parameter, pages that are not included in generateStaticParams will be fetched & rendered on first access
                <br />
                and then <strong>cached to be served on future requests (this can be disabled) </strong>
            </Alert>
            <h1>{topic}</h1>
            {images.map((image) => (
                <Image
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}
                ></Image>
            ))}
        </div>
    );
}

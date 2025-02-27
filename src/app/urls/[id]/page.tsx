import UrlShortenerService from "@/services/UrlShortenerService";
import { redirect } from "next/navigation";

async function fetchOriginalUrl(url: string) {
    const urlService = new UrlShortenerService();
    try {
        const response = await urlService.getUrlByShortUrl(url);
        return response?.originalUrl;
    } catch (error) {
        console.error("Error fetching original URL:", error);
        return null;
    }
}

export default async function UrlRedirect({ params }: { params: { id: string } }) {
    // Ensure params.id is correctly passed
    const original = await fetchOriginalUrl(params.id);

    if (original) {
        console.log("Redirecting to original URL:", original);
        redirect(original); // This will throw an error to trigger the redirect
    } else {
        console.log("Unable to redirect, redirecting to 404");
        redirect('/404'); // Redirect to a 404 page if the original URL is not found
    }
}
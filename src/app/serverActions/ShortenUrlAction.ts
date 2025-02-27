'use server'

import UrlShortenerService from "@/services/UrlShortenerService";
import { revalidatePath } from "next/cache";

const shortenURL = async (formData: FormData) => {
    const originalUrl : string = formData.get('originalUrl') as string;
    console.log("Original URL Passed is", originalUrl);
    const shortnerService = new UrlShortenerService();
    const shortUrl = await shortnerService.shortenUrl(originalUrl);
    revalidatePath('/urls');
}

export default shortenURL;
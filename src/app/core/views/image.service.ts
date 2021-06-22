import { Injectable } from "@angular/core";
import { CloudinaryImage } from "@cloudinary/base";

const CLOUD_NAME = { cloudName: "dak-coffee-roasters" };

@Injectable({
    providedIn: "root"
})
export class ImageService {

    constructor() { }

    getImageUrl(path: string): string {
        return new CloudinaryImage(path, CLOUD_NAME).toURL();
    }

    getProductThumbUrl(basename: string): string {
        return this.getImageUrl(`/Products/Thumbs/${ basename }`);
    }

    getProductMainUrl(basename: string): string {
        return this.getImageUrl(`/Products/Mains/${ basename }`);
    }
}

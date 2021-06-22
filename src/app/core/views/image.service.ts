import { Injectable } from "@angular/core";
import { CloudinaryImage } from "@cloudinary/base";

import { environment as config } from "@env";

@Injectable({
    providedIn: "root"
})
export class ImageService {

    constructor() { }

    private getImageUrl(path: string): string {
        return new CloudinaryImage(path, {cloudName: config.cloudinaryCloudName}).toURL();
    }

    getProductThumbUrl(basename: string): string {
        return this.getImageUrl(`/Products/Thumbs/${ basename }`);
    }

    getProductMainUrl(basename: string): string {
        return this.getImageUrl(`/Products/Mains/${ basename }`);
    }
}

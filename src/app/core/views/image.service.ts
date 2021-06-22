import { Injectable } from "@angular/core";
import { CloudinaryImage } from "@cloudinary/base";

import { environment as config } from "@env";

@Injectable({
    providedIn: "root"
})
export class ImageService {

    constructor() { }

    getImageUrl(path: string): string {
        return new CloudinaryImage(path, config.cloudinaryName).toURL();
    }

    getProductThumbUrl(basename: string): string {
        return this.getImageUrl(`/Products/Thumbs/${ basename }`);
    }

    getProductMainUrl(basename: string): string {
        return this.getImageUrl(`/Products/Mains/${ basename }`);
    }
}

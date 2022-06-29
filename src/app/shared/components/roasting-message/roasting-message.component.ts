import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";

import { ROASTING_DAYS } from "@utils/constants/roasting";
import { CART_WEIGHT_THRESHOLD } from "@utils/constants/discounts";

@Component({
    selector: "app-roasting-message",
    templateUrl: "./roasting-message.component.html",
    styleUrls: ["./roasting-message.component.scss"]
})
export class RoastingMessageComponent {

    get messageDetails(): string {
        const today = new Date();
        const baseString = `Minimum order is ${CART_WEIGHT_THRESHOLD}kgs.`;
        let nextDateString = `Next Roasting Date is ${this.datePipe.transform(this.getNextRoastingDays()[0], "EEEE, MMMM d")}.`;

        if (this.isRoastingDay(today) === true) {
            nextDateString = `Roasting today.`;
        }

        // return `${baseString} ${nextDateString}`;
        return `Roastery closed between July 2-10. Next roasting date July 11.`
    }

    constructor(private datePipe: DatePipe) {}

    private isRoastingDay(day: Date): boolean {
        return ROASTING_DAYS.includes(day.getDay());
    }

    private getNextRoastingDays(): Date[] {
        const nextDays = ROASTING_DAYS.map((oneDayIndex) => this.getNextDayOfWeek(oneDayIndex));
        return nextDays.sort((a, b) => a.getTime() - b.getTime());
    }

    private getNextDayOfWeek(dayIndex: number): Date {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + ((7 - nextDay.getDay()) % 7 + dayIndex) % 7);

        return nextDay;
    }
}

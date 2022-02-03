import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";

import { ROASTING_DAYS } from "@utils/constants/roasting";

@Component({
    selector: "app-roasting-message",
    templateUrl: "./roasting-message.component.html",
    styleUrls: ["./roasting-message.component.scss"]
})
export class RoastingMessageComponent {

    get messageDetails(): string {
        const today = new Date();
        const nextDateString = `Next Roasting Date is ${this.datePipe.transform(this.getNextRoastingDays()[0], "EEEE, MMMM d")}`;

        if (this.isRoastingDay(today) === true) {
            return `Roasting today, ${nextDateString}`;
        }

        return nextDateString;
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

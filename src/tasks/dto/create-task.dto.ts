import { IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

enum NotificationTimeFormat {
    NONE = 'none',
    HOUR = 'hour',
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month'
}

enum RetryFormat {
    NONE = 'none',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

export class CreateTaskDto {

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    category_id: number;

    @IsNotEmpty()
    @Length(0, 80)
    title: string;

    @IsNotEmpty()
    @Length(0, 100)
    body: string;

    @IsNotEmpty()
    @IsIn(["daily", "weekly", "none", "monthly", "yearly"])
    retry: string;

    @IsNotEmpty()
    @IsIn(["none", "hour", "day", "week", "month"])
    notification_time: string;

    @IsNotEmpty()
    @IsDate()
    date: string;
}
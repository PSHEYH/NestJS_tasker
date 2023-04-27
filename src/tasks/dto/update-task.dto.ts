import { IsDate, IsEnum, IsInt, IsNotEmpty, Length, Min } from 'class-validator';

enum NotificationTimeFormat {
    NONE='none',
    HOUR='hour',
    DAY='day',
    WEEK='week',
    MONTH='month'
}

enum RetryFormat {
    NONE='none',
    DAILY='daily',
    WEEKLY='weekly',
    MONTHLY='monthly',
    YEARLY='yearly'
}

export class UpdateTaskDto{
    
    @IsInt()
    @Min(1)
    category_id: number;

    @IsNotEmpty()
    @Length(0, 80)
    title: string;

    @Length(0, 100)
    body: string;

    @IsEnum(RetryFormat)
    retry: string;

    @IsEnum(NotificationTimeFormat)
    notification_time: string;

    @IsDate()
    date: string;
}
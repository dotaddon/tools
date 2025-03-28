declare const process: {
    env: {
        NODE_ENV: 'production' | 'development';
        BUILD_ENV: 'production' | 'development';
    };
};

declare interface CustomUIConfig {
    temporaryScheduleHandle: ScheduleID;
}
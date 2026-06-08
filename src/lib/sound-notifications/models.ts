const SpeakerNotification = {
    Boom: "Boom",
    SoundSensorError: "SoundSensorError",
    RadioError: "RadioError",
    AirmarError: "AirmarError",
    GeneralError: "GeneralError",
    GeneralAlert: "GeneralAlert",
} as const;

export type SpeakerNotification =
    | (typeof SpeakerNotification)[keyof typeof SpeakerNotification]
    | { WeatherTimeoutError: boolean };
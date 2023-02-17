export const buttonForCity = {
    "reply_markup": {
        "inline_keyboard": [
            [{
                text: "Forecast in Kyiv",
                callback_data: "city",
            }]
        ]
    }
};
export const unitsButton = {
    "reply_markup": {
        "inline_keyboard": [
            [{
                text: "Metric",
                callback_data: "metric",
            }],
            [{
                text: "Imperial",
                callback_data: "imperial",
            }]
        ]
    }
};
export const buttonsInterval = {
    "reply_markup": {
        "inline_keyboard": [
            [{
                text: "Weather now",
                callback_data: "now",
            }],
            [{
                text: "At intervals of 3 hours",
                callback_data: "interval3",
            }],
            [{
                text: "At intervals of 6 hours",
                callback_data: "interval6",
            }],
        ]
    }
};

export const buttonsIntervalsMessages = {
    "reply_markup": {
        "inline_keyboard": [
            [{
                text: "Yes, I want to get weather every 3 hours",
                callback_data: "3",
            }],
            [{
                text: "Yes, I want to get weather every 6 hours",
                callback_data: "6",
            }],
            [{
                text: "No, I don't want to. ",
                callback_data: "rejection",
            }],
        ]
    }
}

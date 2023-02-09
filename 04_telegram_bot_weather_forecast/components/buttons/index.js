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
                text: "at intervals of 3 hours",
                callback_data: "3",
            }],
            [{
                text: "at intervals of 6 hours",
                callback_data: "6",
            }],
        ]
    }
};

//
// Created by altaks on 04/04/24.
//

#include <Arduino.h>

void alarm_callback(void* arg) {
    esp_deep_sleep((unsigned long long) arg);
}

void miseEnVeilleNuit(struct tm dateAAttendre, unsigned long long delaiVeilleUS) {
    esp_timer_create_args_t timerconfig = {
            .callback = &alarm_callback,
            .arg = (void *) delaiVeilleUS,
            .name = "veille"
    };

    esp_timer_handle_t timer;
    ESP_ERROR_CHECK(esp_timer_create(&timerconfig, &timer));

    uint64_t chosen_time = mktime(&dateAAttendre) * 1000000ULL;

    time_t current_time;
    time(&current_time);

    uint64_t current_time_us = current_time * 1000000ULL;
    uint64_t delay_us;

    if (chosen_time > current_time_us) {
        delay_us = chosen_time - current_time_us;
    } else {
        delay_us = (24 * 3600 * 1000000ULL) - (current_time_us - chosen_time);
    }

    ESP_ERROR_CHECK(esp_timer_start_once(timer, delay_us));
}
<template>
    <div class="explainer">
        <h3>Pride is Political is an independent platform for alternative Pride events in Copenhagen. We believe in queer liberation, solidarity and human rights.</h3>
    </div>
    <div class="feature">
        <div class="feature-text">
            <h3>Share your events</h3>
            <p>Pride is Political promotes events that share our values of queer liberation for all. <br><br>Send us your events, big and small, and we will help share them with the community.</p>
        </div>
        <div class="feature-text">
            <h3>Find events</h3>
            <p>Pride is Political helps you find events that support queer liberation for all. <br><br>Events on our platform support the fight for international solidarity, justice and universal human rights.</p>
        </div>
    </div>
    <div class="calendar">
        <h3>Calendar</h3>
        <p>{{ eventCount }} events registrered so far</p>
        <!-- <div class="date-buttons">
            <button v-for="date in dates" :class="activeDate === date ? 'active' : ''" @click="activeDate = date" v-html="date > 0 ? date + '.<br>AUG' : 'All days' "></button>
        </div> -->
        <div class="events-container">
            <template v-for="event in events">
                <NuxtLink  target="_blank" :to="event.url" class="event" v-if="activeDate === 0 || new Date(event.datetime).getDate() === activeDate">
                    <div class="event-content">
                        <div class="event-image" :style="imageSrc(event)"></div>
                        <div class="event-text">
                            <h4 class="event-title">{{ event.title }}</h4>
                            <h5 class="event-organisers">by {{ event.organisers }}</h5>
                            <p class="event-date"><strong>Date</strong><span>{{ new Date(event.datetime).toLocaleDateString('da-DK') }}</span></p>
                            <p class="event-time"><strong>Time</strong><span>{{ new Date(event.datetime).toLocaleTimeString('da-DK', { hour: "2-digit", minute: "2-digit" }) }}</span></p>
                            <p class="event-venue"><strong>Place</strong><span>{{ event.venue }}</span></p>
                        </div>
                    </div>
                    <span class="event-link" target="_blank" :to="event.url">Click to read more ></span>
                </NuxtLink>
            </template>
        </div>
    </div>
    <div class="submission" id="submission">
        <h3>Submit your event</h3>
        <p>To get your event onto the Pride is Political calendar, we ask you to fill out a brief form with some basic information about your event.</p>
        <NuxtLink class="form-link" to="https://forms.zohopublic.eu/prideispoliticalcph/form/PRIDEISPOLITICAL2024/formperma/abHwwjwNIOTzTcV3VWHu9od-8viYKQZeJs4PLaYIe9s" target="_blank">Click here to find our event submission form</NuxtLink>
        <p class="questions">If you have any questions about the form, <br><NuxtLink to="/about">click here to find our contact information</NuxtLink>.</p>
    </div>
    <footer>
        <p>Pride is Political is a project by <NuxtLink target="_blank" to="https://ada-ada-ada.art">Ada Ada Ada</NuxtLink> and <NuxtLink target="_blank" to="https://simensorthe.dk/">Simen Sorthe</NuxtLink>.</p>
    </footer>
</template>

<script setup lang="ts">
let activeDate = ref(0)
let dates = [0, 10, 11, 12, 13, 14, 15, 16, 17, 18]

const { data: events } = await useAsyncData('events', () => queryContent('/events').sort({datetime: 1}).find())
let eventCount = events.value.length

const img = useImage()

function imageSrc(event) {
    const imgUrl = img('img/events/' + event.img_url, { width: 300 })
    return { backgroundImage: `url('${imgUrl}')` }
}
</script>

<style scoped lang="scss">
.explainer {
    align-items: center;
    box-sizing: border-box;
    color: $white;
    display: flex;
    flex-direction: column;
    margin: $base * 2 0;
    padding: $base * 6 0;
    text-align: center;
    width: 100%;

    @include screenSizes(desktop) {
        font-size: $base * 6;
        margin: $base * 4 0;
    }
    
    h3 {
        color: black;
        font-weight: bold;
        font-style: italic;
        font-size: $base * 3;
        max-width: $baseMaxMobileWidth;
        text-transform: uppercase;

        @include screenSizes(desktop) {
            font-size: $base * 6;
            max-width: $baseMaxWidth;
        }
    }
}

.feature {
    .theme-trans & {
        background: $transGradientColorOne;
        background: $transGradientTwo;
        opacity: 1;
    }

    .theme-bipoc & {
        background: $bipocGradientColorOne;
        background: $bipocGradientTwo;
        opacity: 1;
    }

    .theme-pal & {
        background: $palGradientColorOne;
        background: $palGradientTwo;
        opacity: 1;
    }

    color: $white;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $base * 8;
    opacity: 0;
    padding: $base * 8 0;
    width: 100%;

    transition: opacity 300ms ease-in-out;

    > div {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        
        @include screenSizes(desktop) {
            width: 50%;
        }
    }

    .feature-text {
        text-align: center;

        h3 {
            font-size: $base * 4;
            text-transform: uppercase;
        }

        p {
            font-family: "Proxima Nova", sans-serif;
            font-size: $base * 2.5;
            max-width: $baseMaxMobileWidth;

            @include screenSizes(desktop) {
                max-width: 60%;
            }
        }
    }

    .image-container {
        background-image: url("~/assets/img/anti-fascist-pride.jpg");
        background-position: center;
        background-size: cover;
        border-radius: 100%;
        height: $base * 30;
        width: $base * 30;
    }
}

.calendar {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: $base * 4;

    h3 {
        font-size: $base * 6;
        text-transform: uppercase;
    }

    p {
        font-size: $base * 3;
        text-transform: uppercase;
    }

    > a {
        .theme-trans & {
            background: $transGradientColorOne;
            background: $transGradientTwo;
        }

        .theme-bipoc & {
            background: $bipocGradientColorOne;
            background: $bipocGradientTwo;
        }

        .theme-pal & {
            background: $palGradientColorOne;
            background: $palGradientTwo;
        }

        color: $white;
        cursor: pointer;
        font-size: $base * 3;
        padding: $base * 1.5 $base * 3;
        margin-bottom: $base * 4;
        text-decoration: none;
    }
}

.date-buttons {
    display: flex;
    justify-content: space-evenly;
    flex-flow: wrap;
    width: 90vw;

    @include screenSizes(desktop) {
        justify-content: space-between;
        flex-flow: nowrap;
        width: 100%;
    }

    button {
        background-color: $white;
        color: $black;
        border: 1px solid $black;
        border-radius: 0;
        box-sizing: border-box;
        cursor: pointer;
        font-size: $base * 2;
        height: $base * 8;
        margin-bottom: $base;
        text-transform: uppercase;
        width: $base * 8;
        
        @include screenSizes(desktop) {
            margin-bottom: 0;
            height: $base * 8;
            width: $base * 8;
        }

        &:hover:not(.active) {
            border-style: dashed;
        }

        &.active {
            .theme-trans & {
                background: $transGradientColorOne;
                background: $transGradientThree;
            }

            .theme-bipoc & {
                background: $bipocGradientColorOne;
                background: $bipocGradientThree;
            }

            .theme-pal & {
                background: $palGradientColorOne;
                background: $palGradientThree;
            }
            border: none;
            color: $white;
        }
    }
}

.events-container {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-top: $base * 4;
    width: 90vw;

    @include screenSizes(desktop) {
        width: 80vw;
    }
}

.event {
    .theme-trans & {
        border-color: $transGradientColorOne;
    }

    .theme-bipoc & {
        border-color: $bipocGradientColorOne;
    }

    .theme-pal & {
        border-color: $palGradientColorOne;
    }

    align-self: flex-start;
    border-style: double;
    border-width: 0;
    box-sizing: border-box;
    color: $black;
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
    justify-content: space-between;
    min-height: $base * 60;
    margin-bottom: $base * 4;
    position: relative;
    text-decoration: none;

    @include screenSizes(desktop) {
        flex-basis: $base * 40;
    }
}

.event-image {
    background-position: center;
    background-size: cover;
    height: $base * 25;
    width: 100%;
}

.event-text {
    display: flex;
    flex-direction: column;
    padding: $base;
    font-family: "Proxima Nova", sans-serif;

    p {
        font-size: $base * 2;
        margin: 0;
    }

    .event-title {
        font-size: $base * 3;
        text-transform: uppercase;
    }

    .event-organisers {
        border-bottom: 1px solid $black;
        font-size: $base * 2;
        margin-bottom: $base;
        padding-bottom: $base;
    }

    .event-time, .event-date, .event-venue {
        align-items: center;
        display: flex;
        font-family: 'FIRSTGAYAMERICANS', sans-serif;
        font-size: $base * 2.5;
        justify-content: space-between;

        > span {
            font-family: 'Proxima Nova', sans-serif;
            font-size: $base * 2;
            text-align: right;
        }
    }

    h5 {
        font-style: italic;
        font-weight: normal;
    }

    h6 {
        font-size: $base * 2;
        font-weight: normal;
    }
}

.event-link {
    .theme-trans & {
        background: $transGradientColorOne;
        background: $transGradientThree;
        border-color: $transGradientColorOne;
    }

    .theme-bipoc & {
        background: $bipocGradientColorOne;
        background: $bipocGradientThree;
        border-color: $bipocGradientColorOne;
    }

    .theme-pal & {
        background: $palGradientColorOne;
        background: $palGradientThree;
        border-color: $palGradientColorOne;
    }
    border-style: double;
    border-width: 0;
    box-sizing: border-box;
    display: flex;
    color: $white;
    padding: $base;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
}

.submission {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: $base * 4;

    p {
        font-family: "Proxima Nova", sans-serif;
        font-size: $base * 2.5;
        text-align: center;
        max-width: $baseMaxMobileWidth;
        
        @include screenSizes(desktop) {
            max-width: $base * 80;
        }
    }

    h3 {
        font-size: $base * 6;
        text-transform: uppercase;
    }

    a {
        color: $white;
        font-family: 'FIRSTGAYAMERICANS', sans-serif;
        font-size: $base * 3;
        text-transform: uppercase;
    }

    .questions a {
        color: $black;
        font-family: "Proxima Nova", sans-serif;
        font-size: $base * 2.5;
        text-transform: none;
    }
}

.form-link {
    .theme-trans & {
        background: $transGradientColorOne;
        background: $transGradientFour;
        opacity: 1;
    }

    .theme-bipoc & {
        background: $bipocGradientColorOne;
        background: $bipocGradientFour;
        opacity: 1;
    }

    .theme-pal & {
        background: $palGradientColorOne;
        background: $palGradientFour;
        opacity: 1;
    }

    box-sizing: border-box;
    color: $white;
    opacity: 0;
    padding: $base * 2;
    text-align: center;
    text-decoration: none;
    transition: opacity 300ms ease-in-out;
    max-width: $baseMaxMobileWidth;
    
    a {
        text-decoration: none;
    }
}

footer {
    .theme-trans & {
        background: $transGradientColorOne;
        background: $transGradientTwo;
        opacity: 1;
    }

    .theme-bipoc & {
        background: $bipocGradientColorOne;
        background: $bipocGradientTwo;
        opacity: 1;
    }

    .theme-pal & {
        background: $palGradientColorOne;
        background: $palGradientTwo;
        opacity: 1;
    }

    color: $white;
    display: flex;
    justify-content: center;
    opacity: 0;
    padding: $base 0;
    text-transform: uppercase;
    text-align: center;
    transition: opacity 300ms ease-in-out;
    width: 100%;

    a {
        color: $white;
    }
}
</style>
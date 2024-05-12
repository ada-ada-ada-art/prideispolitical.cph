<template>
    <div class="explainer">
        <h3>PRIDE IS POLITICAL is a network for pride events in Copenhagen that believe in international solidarity, justice and universal human rights.</h3>
    </div>
    <div class="feature">
        <div class="feature-text">
            <h3>Share your events</h3>
            <p>PRIDE IS POLITICAL promotes events that share our values of queer liberation for all. <br><br>Send us your events, big and small, and we will help share them with the community.</p>
        </div>
        <div class="feature-text">
            <h3>Find events</h3>
            <p>PRIDE IS POLITICAL helps you find events that support queer liberation for all. <br><br>Events in our network support the fight for international solidarity, justice and universal human rights.</p>
        </div>
    </div>
    <div class="calendar">
        <h3>Calendar</h3>
        <p>{{ eventCount }} events registrered so far</p>
        <div class="date-buttons">
            <button v-for="date in dates" :class="activeDate === date ? 'active' : ''" @click="activeDate = date" v-html="date > 0 ? date + '.<br>AUG' : 'All days' "></button>
        </div>
        <div class="events-container">
            <template v-for="event in events">
                <NuxtLink  target="_blank" :to="event.url" class="event" v-if="activeDate === 0 || new Date(event.datetime).getDate() === activeDate">
                    <div class="event-content">
                        <div class="event-image" :style="imageSrc(event)"></div>
                        <div class="event-text">
                            <h4 class="event-title">{{ event.title }}</h4>
                            <h5 class="event-organisers">by {{ event.organisers }}</h5>
                            <p class="event-date"><strong>Date:</strong><span>{{ new Date(event.datetime).toLocaleDateString('da-DK') }}</span></p>
                            <p class="event-time"><strong>Time:</strong><span>{{ new Date(event.datetime).toLocaleTimeString('da-DK', { hour: "2-digit", minute: "2-digit" }) }}</span></p>
                            <h6 class="event-venue"><strong>Venue:</strong><span>{{ event.venue }}</span></h6>
                        </div>
                    </div>
                    <span class="event-link" target="_blank" :to="event.url">See more ></span>
                </NuxtLink>
            </template>
        </div>
    </div>
    <div class="submission" id="submission">
        <h3>Submit your event</h3>
        <p>To get your event onto the PRIDE IS POLITICAL calendar, we ask you to fill out a brief form with some basic information about your event.</p>
        <p class="form-link"><NuxtLink to="https://forms.zohopublic.eu/prideispoliticalcph/form/PRIDEISPOLITICAL2024/formperma/abHwwjwNIOTzTcV3VWHu9od-8viYKQZeJs4PLaYIe9s" target="_blank">Click here to find our event submission form</NuxtLink></p>
        <p class="questions">If you have any questions about the form, <br><NuxtLink to="/about" target="_blank">click here to find our contact information</NuxtLink>.</p>
    </div>
    <footer>
        <p>PRIDE IS POLITICAL is a project by <NuxtLink target="_blank" to="https://ada-ada-ada.art">Ada Ada Ada</NuxtLink> and <NuxtLink target="_blank" to="https://simensorthe.dk/">Simen Sorthe</NuxtLink>.</p>
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
    line-height: 250%;
    padding: $base * 8 0;
    margin: $base * 4 0;
    text-align: center;
    width: 100%;
    
    h3 {
        color: black;
        font-weight: bold;
        font-style: italic;
        font-size: $base * 6;
        max-width: $baseMaxWidth;
    }
}

.feature {
    background-color: $secondaryColor;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $base * 8;
    padding: $base * 8 0;
    width: 100%;

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
            font-size: $base * 3;
            max-width: 60%;
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
    }

    > a {
        background: $primaryColor;
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
    justify-content: space-between;
    flex-flow: wrap;
    width: 90vw;

    @include screenSizes(desktop) {
        flex-flow: nowrap;
        width: 100%;
    }

    button {
        background-color: $secondaryColor;
        border: none;
        border-radius: 0;
        cursor: pointer;
        font-size: $base * 2;
        height: $base * 8;
        width: $base * 8;
        
        @include screenSizes(desktop) {
            height: $base * 8;
            width: $base * 8;
        }

        &.active {
            background: $primaryColor;
            color: $white;
        }

        &:not(.active):hover {
            border: 1px solid $primaryColor;
        }
    }
}

.events-container {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: $base * 4;
    width: 90vw;

    @include screenSizes(desktop) {
        width: $base * 110;
    }
}

.event {
    align-self: flex-start;
    border: 1px solid $primaryColor;
    color: $black;
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
    min-height: $base * 40;
    margin-bottom: $base * 4;
    justify-content: space-between;
    text-decoration: none;
    transition: 300ms box-shadow ease-in-out;

    @include screenSizes(desktop) {
        flex-basis: $base * 30;
    }
}

.event-image {
    background-position: center;
    background-size: cover;
    height: $base * 15;
    width: 100%;
}

.event-text {
    display: flex;
    flex-direction: column;
    padding: $base;
    font-family: sans-serif;

    .event-organisers {
        margin-bottom: $base;
    }

    p {
        font-size: $base * 2;
        margin: 0;
    }

    .event-time, .event-date, .event-venue {
        display: flex;
        justify-content: space-between;

        > span {
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
    border-top: 1px solid $primaryColor;
    display: flex;
    color: $black;
    padding: $base;
    text-align: center;
    text-decoration: none;
}

.submission {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: $base * 4;

    p {
        font-size: $base * 3;
        text-align: center;
        max-width: $base * 80;
    }

    h3 {
        font-size: $base * 6;
        text-transform: uppercase;
    }

    a {
        color: $white;
    }

    .questions a {
        color: $black;
    }
}

.form-link {
    background: $primaryColor;
    padding: $base * 2;
    
    a {
        text-decoration: none;
    }
}

footer {
    justify-content: center;
    background: $primaryColor;
    display: flex;
    padding: $base 0;
    width: 100%;

    a {
        color: $black;
    }
}
</style>
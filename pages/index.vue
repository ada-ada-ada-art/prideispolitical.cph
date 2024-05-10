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
        <NuxtLink to="#submission">Add your event</NuxtLink>
        <p>Pick a date</p>
        <div class="date-buttons">
            <button v-for="date in dates" :class="activeDate === date ? 'active' : ''" @click="activeDate = date">{{ date }}</button>
        </div>
        <div class="events-container">
            <div v-for="event in events" class="event">
                <div class="event-content">
                    <div class="event-image" :style="imageSrc(event)"></div>
                    <div class="event-text">
                        <h4>{{ event.title }}</h4>
                        <h5>by {{ event.organisers }}</h5>
                        <time :datetime="event.datetime">{{ event.datetime }}</time>
                        <h6>{{ event.venue }}</h6>
                    </div>
                </div>
                <NuxtLink class="event-link" target="_blank" :to="event.url">See more ></NuxtLink>
            </div>
        </div>
    </div>
    <div class="submission" id="submission">
        <h3>Submit your event</h3>
        <p>To get your event onto the PRIDE IS POLITICAL calendar, we ask you to fill out a brief form with some basic information about your event.</p>
        <p class="form-link"><NuxtLink to="/" target="_blank">Click here to find our event submission form</NuxtLink></p>
        <p>If you have any questions about the form, <br><NuxtLink to="/contact" target="_blank">click here to find our contact information</NuxtLink>.</p>
    </div>
    <footer>
        <p>PRIDE IS POLITICAL is a project by <NuxtLink target="_blank" to="https://ada-ada-ada.art">Ada Ada Ada</NuxtLink> and <NuxtLink target="_blank" to="https://simensorthe.dk/">Simen Sorthe</NuxtLink>.</p>
    </footer>
</template>

<script setup lang="ts">
let activeDate = ref(10)
let dates = [10, 11, 12, 13, 14, 15, 16, 17, 18]

const { data: events } = await useAsyncData('events', () => queryContent('/events').find())
let eventCount = events.value.length

const img = useImage()

function imageSrc(event) {
    const imgUrl = img('img/events/' + event.img_url, { width: 300 })
    return { backgroundImage: `url('${imgUrl}')` }
}
</script>

<style scoped lang="scss">
.explainer {
    background: dimgrey;
    background-position: center;
    background-size: cover;
    align-items: center;
    box-sizing: border-box;
    color: $white;
    display: flex;
    flex-direction: column;
    line-height: 250%;
    padding: $base * 8 0;
    margin-bottom: $base * 8;
    text-align: center;
    width: 100%;
    
    h3 {
        font-weight: normal;
        font-style: italic;
        font-size: $base * 3;
        max-width: $baseMaxWidth;
    }
}

.feature {
    display: flex;
    margin-bottom: $base * 8;

    > div {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
    }

    .feature-text {
        text-align: center;

        h3 {
            font-size: $base * 4;
            text-transform: uppercase;
        }

        p {
            max-width: 75%;
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
        font-size: $base * 4;
        text-transform: uppercase;
    }

    > a {
        border: 1px solid $black;
        background: lightgrey;
        color: $black;
        cursor: pointer;
        padding: $base * 1.5 $base * 3;
        text-decoration: none;
    }
}

.date-buttons {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: $base * 50;

    button {
        background: $white;
        border: 1px solid $black;
        border-radius: 0;
        cursor: pointer;
        height: $base * 4;
        width: $base * 4;

        &.active {
            background: $black;
            color: $white;

            &:hover {
                background-color: dimgrey;
            }
        }

        &:not(.active):hover {
            background-color: lightgrey;
        }
    }
}

.events-container {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: $base * 4;
    width: $base * 110;
}

.event {
    border: 1px solid $black;
    display: flex;
    flex-basis: $base * 30;
    flex-direction: column;
    min-height: $base * 40;
    margin-bottom: $base * 2;
    justify-content: space-between;
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
    background: lightgrey;
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
        text-align: center;
        max-width: $base * 80;
    }

    h3 {
        font-size: $base * 4;
        text-transform: uppercase;
    }

    a {
        color: $black;
    }
}

.form-link {
    background: lightgrey;
    padding: $base * 2;
    
    a {
        text-decoration: none;
    }
}

footer {
    justify-content: center;
    background: lightgrey;
    display: flex;
    padding: $base 0;
    width: 100%;

    a {
        color: $black;
    }
}
</style>
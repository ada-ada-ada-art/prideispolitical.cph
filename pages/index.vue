<template>
    <div class="explainer">
        <h3>Pride is Political is a decentralized festival of autonomous pride events in CPH. <br>You host, we share it with the community. We believe in queer liberation, solidarity and human rights.</h3>
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
        <p class="event-count">{{ eventCount }} event{{ eventCount === 1 ? '' : 's' }} registrered so far</p>
        <!-- <div class="date-buttons">
            <button v-for="date in dates" :class="activeDate === date ? 'active' : ''" @click="activeDate = date" v-html="date > 0 ? date + '.<br>AUG' : 'All days' "></button>
        </div> -->
        <div class="events-container">
            <template v-for="event in events">
                <div target="_blank" :to="event.url" class="event" v-if="activeDate === 0 || new Date(event.datetime).getDate() === activeDate">
                    <div class="event-content">
                        <div class="event-image" :style="imageSrc(event)">
                            <div class="event-image-bottom">
                                <p class="event-date">{{ new Date(event.datetime).toLocaleDateString('da-DK', { month: 'long', day: 'numeric'}) }}</p>
                                <p class="event-time">{{ new Date(event.datetime).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }) }}</p>
                            </div>
                        </div>
                    </div>
                    <h4 class="event-title">{{ event.title }}</h4>
                    <p class="event-venue">{{ event.venue }}</p>
                    <h5 class="event-organisers">Organized by <br/>{{ event.organisers }}</h5>
                    <div class="event-link-container">
                        <NuxtLink class="event-link" target="_blank" :to="event.main_url">{{ getDomainName(event.main_url) }}</NuxtLink>
                        <NuxtLink v-if="event.secondary_url" class="event-link" target="_blank" :to="event.secondary_url">{{ getDomainName(event.secondary_url) }}</NuxtLink>
                    </div>
                </div>
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

let isDev = process.dev
isDev = false
let eventFolder = isDev ? 'dev-events' : 'events'
const { data: events } = await useAsyncData(eventFolder, () => queryContent('/' + eventFolder).sort({datetime: 1}).find())
let eventCount = events.value.length

const img = useImage()

function imageSrc(event) {
    const imgUrl = img('img/events/' + event.img_url, { width: 300, grayscale: true })
    return { backgroundImage: `url('${imgUrl}')` }
}

function getDomainName(link:string) {
    let url = new URL(link)
    return url.hostname
}

let desc = 'Pride is Political is an independent platform for alternative Pride events in Copenhagen. We believe in queer liberation, solidarity and human rights.'
useSeoMeta({
    ogTitle: 'Pride is Political — Independent platform for alternative Pride events in Copenhagen',
    description: desc,
    ogDescription: desc,
    ogType: 'website',
    ogUrl: 'https://prideispolitical.dk',
    ogImage: '/share-image.png'
})

useHead({
    title: 'Pride is Political — Independent platform for alternative Pride events in Copenhagen',
    link: [{
        rel: 'canonical',
        href: 'https://prideispolitical.dk'
    }]
})
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

    .event-count {
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
    align-self: flex-start;
    box-sizing: border-box;
    border: 1px solid $black;
    color: $black;
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: $base * 4;
    position: relative;
    text-decoration: none;

    @include screenSizes(desktop) {
        flex-basis: $base * 50;
    }
}

.event-image {
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    height: $base * 30;
    justify-content: space-between;
    position: relative;
    width: 100%;

    &:after {
        // background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 80%);
        .theme-trans & {
            background: $transGradientOne;
            background-size: 100%;
            opacity: 0.5;
        }

        .theme-bipoc & {
            background: $bipocGradientOne;
            background-size: 100%;
            opacity: 0.5;
        }

        .theme-pal & {
            background: $palGradientOne;
            background-size: 100%;
            opacity: 0.5;
        }

        bottom: 0;
        content: '';
        left: 0;
        height: 100%;
        opacity: 0;
        position: absolute;
        transition: all 300ms ease-in-out;
        width: 100%;
    }
}

.event-image-bottom {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
}

.event-date, .event-time {
    color: $white;
    font-family: 'FIRSTGAYAMERICANS';
    font-size: $base * 2.5;
    margin-top: $base;
    z-index: 10;
}

.event-date {
    padding-left: $base;
}

.event-time {
    padding-right: $base;
}

.event-time, .event-date, .event-venue {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: $base;
    text-transform: uppercase;
}

.event-title {
    border-top: 1px solid $black;
    font-family: 'Proxima Nova', sans-serif;
    font-size: $base * 3;
    font-weight: bold;
    padding: $base;
    text-align: center;
    text-align-last: center;
    text-transform: uppercase;
}

.event-organisers {
    font-family: 'Proxima Nova', sans-serif;
    font-weight: normal;
    margin-bottom: $base * 2;
    padding: 0 $base;
    text-align: center;
    z-index: 100;
}

.event-venue {
    box-sizing: border-box;
    font-family: "Proxima Nova", sans-serif;
    // color: $white;
    font-size: $base * 2;
    margin: 0;
    padding: $base 0 ($base * 2);
    position: relative;
    text-align: center;
    text-transform: none;
    z-index: 100;

    &:after {
        background: $black;
        bottom: $base;
        content: '';
        height: 1px;
        position: absolute;
        width: 50%;
    }
}

.event-link-container {
    justify-content: space-evenly;
    display: flex;
    margin-bottom: $base * 2;
    padding: 0 $base * 2;
}

.event-link {
    .theme-trans & {
        background: $transGradientColorOne;
        background: $transGradientThree;
        border-color: $transGradientColorOne;
        background-size: 100%;
        transition: all 300ms ease-in-out;
    }

    .theme-bipoc & {
        background: $bipocGradientColorOne;
        background: $bipocGradientThree;
        border-color: $bipocGradientColorOne;
        background-size: 100%;
        transition: all 300ms ease-in-out;
    }

    .theme-pal & {
        background: $palGradientColorOne;
        background: $palGradientThree;
        border-color: $palGradientColorOne;
        background-size: 100%;
        transition: all 300ms ease-in-out;
    }
    border-style: double;
    border-width: 0;
    box-sizing: border-box;
    color: $white;
    flex-basis: 40%;
    padding: $base;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
        background-size: 200%;
    }
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
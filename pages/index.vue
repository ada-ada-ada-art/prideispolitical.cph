<template>
    <div class="explainer">
        <h3>Pride is Political is a decentralized festival of autonomous pride events in CPH. <br>You host, we share it with the community. We believe in queer liberation, solidarity and human rights.</h3>
        <a @click="scrollToCalendar()" class="calendar-link">Go to calendar</a>
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
        <h3 ref="calendar">Calendar</h3>
        <div class="year-buttons">
            <button v-for="f in festivals" :class="activeYear === f.year ? 'active' : ''" @click="activeYear = f.year; activeDate = 0">{{ f.year }}</button>
        </div>
        <p class="event-count" v-if="activeDate === 0">{{ eventCount }} event{{ eventCount === 1 ? '' : 's' }} in {{ activeYear }} {{ activeYear === startYear ? 'so far.' : '' }}<div v-if="eventCount < 5">Follow instructions <a @click="scrollToInstructions()" class="instructions-link">below</a> to get your event on the calendar.</div></p>
        <p class="event-count" v-else>{{ eventCount }} event{{ eventCount === 1 ? '' : 's' }} on {{ activeDate }}. August {{ activeYear }}</p>
        <div class="date-buttons" v-if="eventCount > 0">
            <template v-for="f in festivals">
                <button v-if="f.year === activeYear" v-for="date in f.dates" :class="activeDate === date ? 'active' : ''" @click="activeDate = date" v-html="date > 0 ? date + '.<br>AUG' : 'All days' "></button>
            </template>
        </div>
        <div class="events-container">
            <template v-for="event in events">
                <div target="_blank" :to="event.url" class="event" v-if="shouldShowEvent(event)">
                    <div class="event-content">
                        <div class="event-image" :style="imageSrc(event)"></div>
                    </div>
                    <div class="event-datetime">
                        <p class="event-date">{{ new Date(event.datetime).toLocaleDateString('da-DK', { month: 'long', day: 'numeric'}) }}</p>
                        <span class="datetime-splitter">-</span>
                        <p class="event-time">{{ new Date(event.datetime).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }) }}</p>
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
        <h3 ref="instructions">Send us your event</h3>
        <p>To get your event onto the Pride is Political calendar, send us the following information about your event via email (recommended) or Instagram:</p>
        <p>Event title, time and date, location, name of organizer group, one or two links to the event (we recommend using <NuxtLink to="https://dukop.dk/" target="_blank">Duk Op</NuxtLink>) and an event image.</p>
        <p>
            Instagram - <NuxtLink to="https://instagram.com/prideispolitical.cph">@prideispolitical.cph</NuxtLink><br/>
            Email - <NuxtLink to="mailto:prideispolitical.cph@proton.me">prideispolitical.cph@proton.me</NuxtLink>
        </p>
    </div>
    <div class="newsletter">
        <h3>Stay updated</h3>
        <p>Sign up to our newsletter or <NuxtLink to="https://pixelfed.social/prideispolitical.cph">find us on Pixelfed</NuxtLink> to get updates from Pride is Political outside of Meta platforms:</p>
        <form
        action="https://buttondown.com/api/emails/embed-subscribe/prideispolitical.cph"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://buttondown.com/prideispolitical.cph', 'popupwindow')"
        class="embeddable-buttondown-form"
        >
            <label for="bd-email">Enter your email address</label>
            <div class="input-container">
                <input type="email" required name="email" id="bd-email" placeholder="hello@example.com" />
                <input type="submit" value="Sign up" />
            </div>
        </form>
    </div>
    <footer>
        <p>Pride is Political is a project by <NuxtLink target="_blank" to="https://ada-ada-ada.art">Ada Ada Ada</NuxtLink>, Michael Länger and friends.</p>
    </footer>
</template>

<script setup lang="ts">
type Festival = {year:number, events:[], dates:number[]}
const startYear = 2025
let activeDate = ref(0)
let activeYear = ref(0)
let festivals:Festival[] = [{
    year: startYear,
    events: [],
    dates: [0]
}]

let isDev = process.dev
isDev = false
let eventFolder = isDev ? 'dev-events' : 'events'
const { data: events } = await useAsyncData(eventFolder, () => queryContent('/' + eventFolder).sort({datetime: 1}).find())
let eventCount = computed(() => {
    return events.value.reduce((acc, cur) => {
        let shouldBeCounted = shouldShowEvent(cur)
        if (shouldBeCounted) {
            return acc + 1
        } else {
            return acc
        }
    }, 0)
})

// Put together Festival arrays so we can filter properly
events.value.forEach((e, i) => {
    let d = new Date(e.datetime)
    let eventYear = d.getFullYear()
    let eventDay = d.getDate()
    let wasYearAdded = festivals.some((f) => {
        if (f.year === eventYear) {
            return true
        }
    })
    if (!wasYearAdded) {
        festivals.push({
            year: eventYear,
            events: [],
            dates: [0]
        })
    }
    festivals.forEach((f) => {
        if (f.year === eventYear) {
            f.events.push(e)
            if (!f.dates.includes(eventDay)) {
                f.dates.push(eventDay)
            }
        }
    })
})
// Sort festivals by latest year
festivals.sort((a, b) => {
    return a.year > b.year ? -1 : 1
})

onMounted(() => {
  activeYear.value = startYear
})

const img = useImage()
function imageSrc(event) {
    const imgUrl = img('img/events/' + event.img_url, { width: 600, grayscale: true })
    return { backgroundImage: `url('${imgUrl}')` }
}

function getDomainName(link:string) {
    let url = new URL(link)
    return url.hostname
}

function shouldShowEvent(event) {
    let eventDate = new Date(event.datetime)
    let isCorrectDate = activeDate.value === 0 || eventDate.getDate() === activeDate.value
    let isCorrectYear = activeYear.value === 0 || eventDate.getFullYear() === activeYear.value
    return isCorrectDate && isCorrectYear
}

const calendar = ref(null)
function scrollToCalendar() {
    if (process.client && calendar.value) {
        window.scrollTo({
            top: calendar.value.offsetTop, 
            left: 0, 
            behavior: 'smooth'
        });
    }
}

const instructions = ref(null)
function scrollToInstructions() {
    if (process.client && instructions.value) {
        window.scrollTo({
            top: instructions.value.offsetTop, 
            left: 0, 
            behavior: 'smooth'
        });
    }
}

let desc = 'Pride is Political is a decentralized festival of autonomous, alternative pride events in Copenhagen. We believe in queer liberation, solidarity and human rights.'
useSeoMeta({
    ogTitle: 'Pride is Political — A decentralized festival of autonomous, alternative pride events in Copenhagen',
    description: desc,
    ogDescription: desc,
    ogType: 'website',
    ogUrl: 'https://prideispolitical.dk',
    ogImage: '/share-image.png'
})

useHead({
    title: 'Pride is Political — A decentralized festival of autonomous, alternative pride events in Copenhagen',
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
    margin: $base * 2 0 0;
    padding: $base * 6 0 $base * 4;
    text-align: center;
    width: 100%;

    @include screenSizes(desktop) {
        font-size: $base * 6;
        margin: $base * 4 0 0;
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

.calendar-link {
    &:hover {
        border-style: dotted;
    }

    border: 2px solid $black;
    color: $black;
    cursor: pointer;
    font-size: $base * 3;
    margin-top: $base * 4;
    padding: $base $base * 2;
    text-decoration: none;
    text-transform: uppercase;

    @include screenSizes(desktop) {
        font-size: $base * 4;
    }
}

.feature {
    .theme-ready & {
        background: var(--theme-color-one);
        background: var(--theme-gradient-two);
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
            font-family: 'Proxima Nova', sans-serif;
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
        text-align: center;
        text-transform: uppercase;

        a {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    > a {

        .theme-ready & {
            background: var(--theme-color-one);
            background: var(--theme-gradient-two);
        }

        color: $white;
        cursor: pointer;
        font-size: $base * 3;
        padding: $base * 1.5 $base * 3;
        margin-bottom: $base * 4;
        text-decoration: none;
    }
}

.date-buttons, .year-buttons {
    display: flex;
    justify-content: space-evenly;
    flex-flow: wrap;
    width: 90vw;

    @include screenSizes(desktop) {
        justify-content: center;
        flex-flow: wrap;
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
        margin: 0 $base $base;
        text-transform: uppercase;
        width: $base * 8;
        
        @include screenSizes(desktop) {
            margin: 0 $base $base;
            height: $base * 8;
            width: $base * 8;
        }

        &:hover:not(.active) {
            border-style: dashed;
        }

        &.active {
            .theme-ready & {
                background: var(--theme-color-one);
                background: var(--theme-gradient-three);
            }

            border: none;
            color: $white;
        }
    }
}

.year-buttons {
    margin-top: $base * 2;

    button {
        height: auto;
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
        background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 80%);
        mix-blend-mode: hard-light;

        .theme-ready & {
            background: var(--theme-gradient-one);
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
    color: $black;
    display: flex;
    justify-content: space-between;
}

.event-datetime {
    border-top: 1px solid $black;
    display: flex;
    justify-content: center;
}

.datetime-splitter {
    font-size: $base * 2.5;
    margin: 0 $base;
}

.event-date, .event-time {
    color: $black;
    font-family: 'FIRSTGAYAMERICANS';
    font-size: $base * 2.5;
    z-index: 10;
}

.event-date {
    padding-left: $base;
}

.event-time {
    padding-right: $base;
}

.event-time, .event-date, .datetime-splitter {
    margin-top: $base * 2.5;
}

.event-time, .event-date, .event-venue, .datetime-splitter {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: $base;
    text-transform: uppercase;
}

.event-title {
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
    font-family: 'Proxima Nova', sans-serif;
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

.link-title {
    align-self: center;
    font-family: 'Proxima Nova', sans-serif;
    font-size: $base * 1.5;
    font-weight: bold;
    margin: 2 * $base 0;
    text-transform: uppercase;
}

.event-link-container {
    justify-content: space-evenly;
    display: flex;
    margin-bottom: $base * 2;
    padding: 0 $base * 2;
}

.event-link {
    .theme-ready & {
        background: var(--theme-color-one);
        background: var(--theme-gradient-three);
        border-color: var(--theme-color-one);
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
        font-family: 'Proxima Nova', sans-serif;
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
        color: $black;
        font-family: 'FIRSTGAYAMERICANS', sans-serif;
        // font-size: $base * 3;
        text-transform: uppercase;
    }

    .questions a {
        color: $black;
        font-family: 'Proxima Nova', sans-serif;
        font-size: $base * 2.5;
        text-transform: none;
    }
}

.newsletter {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: $base * 4;
    text-align: center;

    p {
        font-family: 'Proxima Nova', sans-serif;
        font-size: $base * 2.5;
        text-align: center;
        max-width: $baseMaxMobileWidth;
        
        @include screenSizes(desktop) {
            max-width: $base * 80;
        }
    }

    a {
        color: $black;
        font-family: 'Proxima Nova', sans-serif;
        font-size: $base * 2.5;
        text-transform: none;
    }

    h3 {
        font-size: $base * 6;
        text-transform: uppercase;
    }

    label {
        font-size: $base * 3;
        display: block;
        margin-bottom: $base;
        text-align: center;
        text-transform: uppercase;
    }

    .input-container {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    input {
        background: none;
        border: 1px solid $black;
        box-sizing: border-box;
        font-size: $base * 2;
        font-family: 'Proxima Nova', sans-serif;
        min-height: $base * 5;
    }

    input[type='email'] {
        margin-right: $base;
        padding: 0 0 0 $base;
        padding-left: $base;
        width: $base * 30;
    }

    input[type='submit'] {
        cursor: pointer;
        font-family: 'FIRSTGAYAMERICANS', sans-serif;
        padding: 0 $base * 2;
        text-transform: uppercase;

        &:hover {
            border-style: dashed;
        }
    }
}

footer {
    .theme-ready & {
        background: var(--theme-color-one);
        background: var(--theme-gradient-two);
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
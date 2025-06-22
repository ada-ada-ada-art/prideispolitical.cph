<template>
    <div>
        <h2>About</h2>
        <h3>PRIDE IS POLITICAL – AND ALWAYS HAS BEEN</h3>
        <p>Over the years, Pride has been commodified and turned into a marketing tool for corporations with questionable agendas.</p>
        <p>With the protests being replaced with rainbow parties, our queer lives were suddenly sanitised to be palpable to a heteronormative society.</p>
        <p>Recent events have made this abundantly clear.</p>
        <p>Copenhagen Pride failed to listen to the community they claim to represent. And after making a series of confusing and contradicting statements, the corporate sponsors showed their true face: their support was conditional on us staying silent while we are watching a genocide unfold.</p>
        <h3>LET’S GET BACK TO OUR ROOTS!</h3>
        <p>Let’s demand liberation for ourselves and others around the world. Let’s insist on Pride being political, as it was intended to be.</p>
        <p>Pride is Political is an independent platform, promoting events that share our values of queer liberation, as well as liberation of others from all forms of oppression.</p>
        <p>We believe in a community rooted in solidarity, justice and autonomy – and our mission is to make the work of independent community organisers visible and accessible.</p>
        <h3>OPEN CALL FOR ALTERNATIVE PRIDE EVENTS</h3>
        <p>We encourage everyone to plan alternative Pride events this summer! And if you do, let us know and we will help you promote them.</p>
        <p>Our only requirement is that you share our values – and stay away from pinkwashing, commodification of our existence, and for-profit agendas.</p>
        <p>We are looking for informative talks, inspiring exhibitions, community hang-outs, political demonstrations, parties with intentions, and more!</p>
        <h2>Contact</h2>
        <p>You can get in touch with us on email or on Instagram, and follow us on Pixelfed.</p>
        <p>Email: <NuxtLink to="mailto:prideispolitical.cph@proton.me">prideispolitical.cph@proton.me</NuxtLink></p>
        <p>Instagram: <NuxtLink to="https://instagram.com/prideispolitical.cph">@prideispolitical.cph</NuxtLink></p>
        <p>Pixelfed: <NuxtLink to="https://pixelfed.social/prideispolitical.cph">prideispolitical.cph@pixelfed.social</NuxtLink></p>
        <h2>Credits</h2>
        <p>Pride is Political is a project by <NuxtLink target="_blank" to="https://ada-ada-ada.art">Ada Ada Ada</NuxtLink> and friends.</p>
        <!-- <p>Graphic design consulting by <NuxtLink target="_blank" to="https://www.instagram.com/michaellaenger/">Michael Langer</NuxtLink>.</p> -->
        <p>The main font is FIRSTGAYAMERICANS by <NuxtLink target="_blank" to="https://genderfailpress.info/">GenderFail</NuxtLink>.</p>
        <p>The secondary font is Proxima Nova by <NuxtLink target="_blank" to="https://www.marksimonson.com/">Mark Simonson</NuxtLink>.</p>
    </div>
</template>

<script setup lang="ts">
let desc = 'Pride is Political is an independent platform for alternative Pride events in Copenhagen. We believe in queer liberation, solidarity and human rights.'
useSeoMeta({
    ogTitle: 'Pride is Political — About',
    description: desc,
    ogDescription: desc,
    ogType: 'website',
    ogUrl: 'https://prideispolitical.dk',
    ogImage: '/share-image.png'
})

useHead({
    title: 'Pride is Political — About',
    link: [{
        rel: 'canonical',
        href: 'https://prideispolitical.dk/about'
    }]
})
</script>

<style lang="scss" scoped>
div {
    margin-top: $base * 4;
    max-width: 90vw;
    
    @include screenSizes(desktop) {
        max-width: $baseMaxWidth;
    }
}

h2 {
    font-size: $base * 4;
    text-align: center;
    text-transform: uppercase;
}

h3 {
    font-size: $base * 3;
    text-transform: uppercase;
}

p {
    font-family: "Inter", sans-serif;
    font-size: $base * 2;
}

a {
    color: $black;

    &:hover {
        color: $secondaryColor;
    }
}
</style>
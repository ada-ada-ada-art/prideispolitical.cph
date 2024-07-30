<template>
    <nav>
        <NuxtLink to="/">
            <h1>Pride is political</h1>
            <h2>Copenhagen · 10-18 Aug 2024</h2>
        </NuxtLink>

        <div class="link-container">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="about">About</NuxtLink>
        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    .theme-trans & {
        background: $transGradientColorOne;
        background: $transGradientOne;
        opacity: 1;
    }

    .theme-bipoc & {
        background: $bipocGradientColorOne;
        background: $bipocGradientOne;
        opacity: 1;
    }

    .theme-pal & {
        background: $palGradientColorOne;
        background: $palGradientOne;
        opacity: 1;
    }

    .theme-lez & {
        background: $lezGradientColorOne;
        background: $lezGradientOne;
        opacity: 1;
    }

    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    opacity: 0;
    padding: $base * 4;
    text-transform: uppercase;
    transition: opacity 300ms ease-in-out;
    width: 100%;

    @include screenSizes(desktop) {
        align-items: normal;
        flex-direction: row;
    }
}

h1 {
    font-size: $base * 6;
    text-align: center;
    text-transform: uppercase;

    @include screenSizes(desktop) {
        text-align: left;
    }
}

h2 {
    font-size: $base * 2;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;

    @include screenSizes(desktop) {
        text-align: left;
    }
}

a {
    color: $white;
    text-decoration: none;
}

.link-container {
    align-items: center;
    display: flex;
    margin-top: $base * 2;

    @include screenSizes(desktop) {
        margin-top: 0;
    }
}

.link-container a {
    font-size: $base * 3;
    margin-left: $base;
}

.link-container a.router-link-exact-active {
    // font-weight: bold;
    position: relative;

    &::after {
        background: $white;
        bottom: -3px;
        border-radius: 1px 2px 1px 3px;
        content: "";
        height: 3px;
        left: 50%;
        position: absolute;
        width: 3px;
    }
}
</style>
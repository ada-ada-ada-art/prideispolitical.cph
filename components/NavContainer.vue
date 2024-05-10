<template>
    <nav>
        <NuxtLink to="/">
            <h1>Pride is political</h1>
            <h2>Copenhagen · 10-18 Aug 2024</h2>
        </NuxtLink>

        <div class="link-container">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="about">About</NuxtLink>
            <NuxtLink to="contact">Contact</NuxtLink>
        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    background: lightgrey;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    padding: $base * 4;
    text-transform: uppercase;
    width: 100%;
}

h1 {
    font-size: $base * 3;
    letter-spacing: -1px;
    text-align: left;
    text-transform: uppercase;
}

h2 {
    font-size: $base * 1.5;
    font-weight: normal;
    text-align: left;
    text-transform: uppercase;
}

a {
    color: $black;
    text-decoration: none;
}

.link-container {
    align-items: center;
    display: flex;
}

.link-container a {
    margin-left: $base;
}

.link-container a.router-link-exact-active {
    // font-weight: bold;
    position: relative;

    &::after {
        background: $black;
        bottom: -3px;
        content: "";
        height: 3px;
        left: 50%;
        position: absolute;
        width: 3px;
    }
}
</style>
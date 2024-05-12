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
    background: $primaryColor;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    padding: $base * 4;
    text-transform: uppercase;
    width: 100%;
}

h1 {
    font-size: $base * 6;
    text-align: left;
    text-transform: uppercase;
}

h2 {
    font-size: $base * 2;
    font-weight: normal;
    text-align: left;
    text-transform: uppercase;
}

a {
    color: $white;
    text-decoration: none;
}

.link-container {
    align-items: center;
    display: flex;
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
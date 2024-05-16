<template>
    <main :class="`theme-${colorScheme}`">
        <NavContainer/>
        <NuxtPage />
    </main>
</template>

<script setup>
let colorSchemeDie = Math.random()
let colorScheme = 'trans'

if(colorSchemeDie < 0.33) {
    colorScheme = 'trans'
}
else if (colorSchemeDie < 0.66) {
    colorScheme = 'bipoc'
}
else {
    colorScheme = 'pal'
}
</script>

<style scoped lang="scss">
main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
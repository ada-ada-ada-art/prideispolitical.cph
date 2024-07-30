<template>
    <main :class="`theme-${colorScheme}`">
        <NavContainer/>
        <slot/>
    </main>
</template>

<script lang="ts">

export default {
    data() {
        return {
            colorScheme: ''
        }
    },
    mounted () {
        let colorSchemes = ['trans', 'bipoc', 'lez', 'pal']
        this.colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
    }
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
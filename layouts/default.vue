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
        let colorSchemeDie = Math.random()
        if(colorSchemeDie < 0.33) {
            this.colorScheme = 'trans'
        }
        else if (colorSchemeDie < 0.66) {
            this.colorScheme = 'bipoc'
        }
        else {
            this.colorScheme = 'pal'
        }
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
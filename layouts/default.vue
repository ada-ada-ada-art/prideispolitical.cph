<template>
    <main :class="`theme-${!isReady ? '' : 'ready'}`">
        <NavContainer/>
        <slot/>
    </main>
</template>

<script lang="ts">

let themes = [
    {
        name: 'trans',
        colorOne: 'rgba(245, 169, 184, 1)',
        colorTwo: 'rgba(91, 206, 250, 1)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [60, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
    {
        name: 'bipoc',
        colorOne: 'rgba(0, 0, 0, 1)',
        colorTwo: 'rgba(97, 57, 21, 1)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [60, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
    {
        name: 'pal',
        colorOne: 'rgba(20, 153, 84, 1)',
        colorTwo: 'rgba(228, 49, 43, 1)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [60, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
    {
        name: 'lez',
        colorOne: 'rgba(255, 154, 86)',
        colorTwo: 'rgba(209, 98, 164)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [70, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
    {
        name: 'bi',
        colorOne: 'rgba(214, 2, 112)',
        colorTwo: 'rgba(0, 56, 168)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [70, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
    {
        name: 'inter',
        colorOne: 'rgba(255, 216, 0)',
        colorTwo: 'rgba(121, 2, 170)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [70, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
    {
        name: 'gay',
        colorOne: 'rgba(38, 206, 170)',
        colorTwo: 'rgba(80, 73, 204)',

        gradientOne: [20, 50, 0, 100],
        gradientTwo: [70, 70, 0, 100],
        gradientThree: [40, 50, 20, 100],
        gradientFour: [80, 20, 0, 100]
    },
]

export default {
    data() {
        return {
            colorScheme: themes[0],
            isReady: false
        }
    },
    mounted () {
        this.colorScheme = themes[Math.floor(Math.random() * themes.length)]

        let rt = document.querySelector(':root')
        console.log('Root', rt)

        rt.style.setProperty('--theme-color-one', this.colorScheme.colorOne)
        rt.style.setProperty('--theme-color-two', this.colorScheme.colorTwo)
        rt.style.setProperty('--theme-gradient-one', `radial-gradient(circle at ${this.colorScheme.gradientOne[0]}% ${this.colorScheme.gradientOne[1]}%, ${this.colorScheme.colorOne} ${this.colorScheme.gradientOne[2]}%, ${this.colorScheme.colorTwo} ${this.colorScheme.gradientOne[3]}%)`)
        rt.style.setProperty('--theme-gradient-two', `radial-gradient(circle at ${this.colorScheme.gradientTwo[0]}% ${this.colorScheme.gradientTwo[1]}%, ${this.colorScheme.colorOne} ${this.colorScheme.gradientTwo[2]}%, ${this.colorScheme.colorTwo} ${this.colorScheme.gradientTwo[3]}%)`)
        rt.style.setProperty('--theme-gradient-three', `radial-gradient(circle at ${this.colorScheme.gradientThree[0]}% ${this.colorScheme.gradientThree[1]}%, ${this.colorScheme.colorOne} ${this.colorScheme.gradientThree[2]}%, ${this.colorScheme.colorTwo} ${this.colorScheme.gradientThree[3]}%)`)
        rt.style.setProperty('--theme-gradient-four', `radial-gradient(circle at ${this.colorScheme.gradientFour[0]}% ${this.colorScheme.gradientFour[1]}%, ${this.colorScheme.colorOne} ${this.colorScheme.gradientFour[2]}%, ${this.colorScheme.colorTwo} ${this.colorScheme.gradientFour[3]}%)`)

        this.isReady = true
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
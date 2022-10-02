<template>
    <div>
        <p class="stat-description">{{statDescription}}</p>
        <p class="stat-number">{{statNumber}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            statDescription: String,
            statNumber: Number
        }
    }
</script>

<style>
.stat-description {
    color: #bbb;
}

.stat-number {
    color: #797979;
    font-size: 28px;
}
</style>
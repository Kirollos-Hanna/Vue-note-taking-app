<script setup>
import StatPoint from './StatPoint.vue'
</script>

<template>
    <div class="statistics">
        <div class="stats-list">
            <StatPoint stat-description="Total" :stat-number="totalNum" />
            <StatPoint stat-description="Completed" :stat-number="completedNum" />
            <StatPoint stat-description="Not completed" :stat-number="notCompletedNum" />
        </div>
    </div>
</template>

<style>
.statistics {
    max-width: 540px;
    height: 120px;
    background-color: #fff;
    display: flex;
    padding-left: 20px;
    padding-right: 50px;
    align-items: center;
    -webkit-box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 10%);
    box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 10%);
}

.stats-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>

<script>
export default {
    data() {
        return {
            totalNum: 0,
            completedNum: 0,
            notCompletedNum: 0
        }
    },
    props: {
        notes: {
            type: Array,
            immediate: true,
            handler(val, oldVal) {
                this.calculateStats()
            }
        }

    },
    methods: {
        calculateStats() {
            let total = 0, comp = 0, notComp = 0;
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i]["status"] === "Not completed") {
                    notComp++
                } else if (this.notes[i]["status"] === "Completed") {
                    comp++
                }
                total++;
            }
            this.totalNum = total
            this.completedNum = comp
            this.notCompletedNum = notComp
        }
    },
    mounted() {
        this.calculateStats()
    },
    watch: {
        notes: {
            handler() {
                this.calculateStats();
            },
            deep: true,
            immediate: true,
        },
    }
}
</script>
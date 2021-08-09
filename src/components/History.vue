<template>
<div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Modal Background -->
        <div class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-25 left-0 right-0 top-0 bottom-0">
            <!-- Modal -->
            <div class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10" style="overflow-y: auto; max-height: 680px;">
                <!-- Title -->
                <span class="font-bold block text-2xl mb-3">🍺 ประวัติการแลกคะแนน </span>
                 <nav class="flex flex-col sm:flex-row">
                        <button @click="receivedHistory" v-if="isClickedReceived" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                            ประวัติการได้รับคะแนน
                        </button>
                        <button @click="receivedHistory" v-if="!isClickedReceived" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                            ประวัติการได้รับคะแนน
                        </button>
                        
                        <button @click="redeemHistory" v-if="isClickedRedeem" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                            ประวัติการแลกคะแนน
                        </button>

                        <button @click="redeemHistory" v-if="!isClickedRedeem" class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                            ประวัติการแลกคะแนน
                        </button>
                </nav>
                <div v-if="isClickedReceived">
                    <table class="min-w-full leading-normal text-2xl">
                        <thead>
                            <tr>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">จำนวนคะแนน</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">รายละเอียด</th>
                                <!-- <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">จำนวนเงิน</th> -->
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">วันที่บันทึก</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in receivedList" :key="index" class="bg-gray-300">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ index + 1 }}</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ item.points_received }} คะแนน</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ item.reward || "ได้รับคะแนนจากการส่งงาน" }}</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ convertDate(item.created_at) }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
                <div v-if="isClickedRedeem">
                    <table class="min-w-full leading-normal text-2xl">
                        <thead>
                            <tr>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">จำนวนคะแนน</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">รายละเอียด</th>
                                <!-- <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">จำนวนเงิน</th> -->
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-lg font-semibold text-gray-600 uppercase tracking-wider">วันที่บันทึก</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in redeemList" :key="index" class="bg-gray-300">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ index + 1 }}</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ item.points_redeem }} คะแนน</td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                <p>{{ item.reward.reward_name }}</p>
                                <p>{{ item.reward.detail }}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">{{ convertDate(item.created_at) }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-right space-x-5 mt-5">
                    <button @click="openModal" class="px-4 py-2 text-sm bg-white rounded-xl border transition-colors duration-150 ease-linear border-gray-200 text-gray-500 focus:outline-none focus:ring-0 font-bold hover:bg-gray-50 focus:bg-indigo-50 focus:text-indigo">Cancel</button>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import HistoryStore from '@/store/HistoryStore'
import AuthUser from '@/store/AuthUser'

export default {
    data() {
        return {
            showModal: false,
            isClickedReceived: true,
            isClickedRedeem: false,
            receivedList: [],
            redeemList: []
        }
    },
    async created() {
        await this.fetchHistory()
    },
    methods: {
        async fetchHistory() {
            let studentLogin = AuthUser.getters.getStudentInfo
            await HistoryStore.dispatch('fetchHistory', studentLogin.std_id)
            this.receivedList = HistoryStore.getters.getReceivedHistory
            this.redeemList = HistoryStore.getters.getRedeemHistory
            console.log(this.receivedList)
            console.log(this.redeemList)
        },
        openModal() {
            this.showModal = this.showModal ? false : true
        },
        receivedHistory() {
            this.toggleTab()
            console.log(this.receivedList)
        },
        redeemHistory() {
            this.toggleTab()
            console.log(this.redeemList)
        },
        toggleTab() {
            this.isClickedReceived = !this.isClickedReceived
            this.isClickedRedeem = !this.isClickedRedeem
        },
        convertDate(createdAt) {
            let date = new Date(createdAt)
            let formatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
            return formatDate.toLocaleString().replace(',', '')
        }
    }

}
</script>

<style>

</style>
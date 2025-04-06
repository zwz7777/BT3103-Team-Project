<template>

   <div class="main-content">
     <router-view/>
   </div>

</template>

<script>
import ReportLostItems from './views/ReportLostItems.vue';
import Entrance from './views/Entrance.vue';
import Sidebar from './components/Sidebar.vue';

export default {
 name: 'App',
 components: {
   Entrance,
   ReportLostItems,
 },
};
</script>


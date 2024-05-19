<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <coach-filter @change-filter="setFilters" />
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button
            isLink
            to="/register"
            v-if="!isCoach && !isLoading && isLoggedIn"
            >Register as coach</base-button
          >
          <base-button isLink to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to register as coach</base-button
          >
        </div>

        <div v-if="isLoading">
          <base-spinner />
        </div>

        <ul v-else-if="hasCoaches">
          <coach-item
            :key="coach.id"
            v-for="coach in filteredCoaches"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>

        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        } else if (
          this.activeFilters.backend &&
          coach.areas.includes('backend')
        ) {
          return true;
        } else if (
          this.activeFilters.career &&
          coach.areas.includes('career')
        ) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async loadCoaches(forceRefresh = false) {
      // Here we set `isLoading` to true and after the request is done, it will be set to false
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/loadCoaches', forceRefresh);
      } catch (err) {
        this.error = err.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

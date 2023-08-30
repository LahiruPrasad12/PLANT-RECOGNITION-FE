<template>
  <ion-content class="ion-padding">
    <ion-button @click="getGeolocation" expand="full">
      <ion-icon slot="start" :icon="locationIcon"></ion-icon>
      Get Geolocation
    </ion-button>
    <ion-card v-if="location">
      <ion-card-header>
        <ion-card-title>Location Information</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>Latitude: {{ location.latitude }}</p>
        <p>Longitude: {{ location.longitude }}</p>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script>
import { IonButton, IonContent, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/vue";
import { locationOutline } from "ionicons/icons";

export default {
  components: {
    IonButton,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  data() {
    return {
      location: null,
      locationIcon: locationOutline,
    };
  },
  methods: {
    getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError);
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    },
    handleSuccess(position) {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    handleError(error) {
      // Error handling as before...
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>

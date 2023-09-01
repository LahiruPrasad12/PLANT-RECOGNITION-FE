<template>
  <ion-content class="ion-padding">
    <div>
      <!-- Your other content here -->
      <ion-button @click="getGeolocation" expand="full">
        <ion-icon slot="start" :icon="locationIcon"></ion-icon>
        Get Geolocation
      </ion-button>
      <ion-button @click="openCamera" expand="full">
        <ion-icon slot="start" :icon="cameraIcon"></ion-icon>
        Open Camera
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
      <pwa-camera-modal></pwa-camera-modal>
    </div>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonContent,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { locationOutline, cameraOutline } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import imagae_save_api from "../../../apis/modules/image_save_api";
import axios from "axios";

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
        navigator.geolocation.getCurrentPosition(
          this.handleSuccess,
          this.handleError
        );
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
      alert(error);
    },

    async openCamera() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      // Do something with the image
      const imageBlob = this.base64ToBlob(image.base64String, "image/jpeg");

      const formData = new FormData();
      formData.append("key", "71dc79788689cfef44877c37564a1fb5");
      formData.append("image", imageBlob);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded:", response.data);
    },

    base64ToBlob(base64, contentType) {
      const sliceSize = 512;
      const byteCharacters = atob(base64);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>

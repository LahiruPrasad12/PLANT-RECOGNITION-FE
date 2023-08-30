<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Plant name </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="plant-detail">
        <div class="image-container">
          <img :src="getImagePath('images.jpg')" alt="Plant">
        </div>
        <div class="details">
          <p>Age: </p>
          <p>Type: </p>
          <p>Description: </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonAvatar,
  IonBackButton, IonButton,
  IonButtons, IonCol,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonFooter, IonGrid,
  IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel,
  IonList, IonListHeader, IonLoading, IonNavLink,
  IonPage, IonRefresher, IonRefresherContent, IonRippleEffect, IonRow, IonSelect, IonSelectOption, IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

export default {
  name: "single_plant",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonFooter,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonAvatar,
    IonRow,
    IonCol,
    IonNavLink,
    IonLoading,
    IonFab, IonFabButton, IonIcon, IonFabList, IonButton,
    IonSelect,
    IonGrid,
    IonSelectOption,
    IonText,
    IonRippleEffect,
  },

  methods: {
    getImagePath(imageFileName) {
      return require(`@/assets/${imageFileName}`);
    }
  }
}
</script>

<style scoped>

</style>

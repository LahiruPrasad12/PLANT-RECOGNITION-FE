<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title>DASHBOARD</ion-title>
        <div class="ion-activatable ripple-parent circle">
          <ion-ripple-effect></ion-ripple-effect>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-container" fullscreen>
      <ion-loading
        :is-open="is_loading"
        cssClass="my-custom-class"
        message="Please wait..."
      />
      <div class="">
        <ion-list>
          <ion-grid>
            <div
              class="small-header anim"
              style="--delay: 0.3s; margin-left: 5px"
            >
              <ion-text color="#000000">
                <h3>Plants</h3>
              </ion-text>
            </div>
            <ion-row v-for="data in all_data" :key="data._id">
              <ion-col size="12">
                <div
                  class="plant-card anim"
                  style="--delay: 0.1s"
                  @click="() => router.push('/dash_board/plants/single_plant')"
                >
                  <div class="image-container">
                    <img :src=data.url  alt="Plant 1" />
                  </div>
                  <div class="details">
                    <h2>{{ data.predicted_name }}</h2>
                    <p>Age: 10</p>
                    <!--                    <p>Type: Apple</p>-->
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import "@/assets/test.css";
import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonNavLink,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSelect,
  IonGrid,
  IonSelectOption,
  IonText,
  IonRippleEffect,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import prediction_api from "@/apis/modules/prediction_api";
export default {
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
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonButton,
    IonSelect,
    IonGrid,
    IonSelectOption,
    IonText,
    IonRippleEffect,
  },

  name: "index",

  data() {
    return {
      is_loading: false,
      all_data: [],
    };
  },

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  mounted() {
    this.getAllPredictedData();
  },

  methods: {
    getImagePath(imageFileName) {
      return require(`@/assets/${imageFileName}`);
    },

    async getAllPredictedData() {
      try {
        this.is_loading = true;
        let respond = (await prediction_api.predictedData()).data;
        this.all_data = respond;
        console.log(respond);
      } catch (e) {}
      this.is_loading = false;
    },
  },
};
</script>

<style scoped>
.plant-card {
  display: flex;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  flex: 1;
  margin-right: 10px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.details {
  flex: 0.5;
  margin-top: 5px;
}

h2 {
  font-size: 1.2rem;
  margin: 0;
}

p {
  margin: 5px 0;
}
</style>

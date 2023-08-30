<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="align-items: center;">ADD STOCK</ion-title>
        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-label position="floating">Item</ion-label>
            <ion-select v-model="item_code" class="u-input" name="item_code" placeholder="Select role" required>
              <ion-select-option v-for="i in item" :value="i.value">{{ i.label }}</ion-select-option>
            </ion-select>
            <ion-row v-show="itemCodeError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ itemCodeError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">Quantity</ion-label>
            <ion-input v-model="available_stock" class="u-input" clear-input min="0" name="available_stock"
                       placeholder="e.g. 12" required
                       type="number"></ion-input>
          </ion-col>
          <ion-row v-show="stockError" class="ion-text-start">
            <ion-col size="12">
              <ion-text color="danger">
                <span>{{ stockError }}</span>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-row>

        <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                    @click="saveData">
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Add
        </ion-button>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import StockApis from "@/apis/modules/stock_apis/stock_apis";
import SupplierApis from '@/apis/modules/supplier_apis/supplier_apis';
import {defineRule, useField, useForm} from "vee-validate";

import {
  addCircleOutline,
  arrowDownCircleOutline,
  arrowForwardCircleOutline,
  arrowForwardOutline,
  cafeOutline,
  calendarOutline,
  removeCircleOutline,
  timeOutline,
  minusOutline,
} from 'ionicons/icons';
import {
  IonModal,
  IonText,
  IonIcon,
  IonContent,
  IonToolbar,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
  IonAvatar,
  IonImg,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonTextarea,
  createAnimation
} from "@ionic/vue";

export default {
  components: {
    IonModal,
    IonContent,
    IonToolbar,
    IonButton,
    IonTitle,
    IonItem,
    IonList,
    IonLabel,
    IonAvatar,
    IonImg,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText,
    IonTextarea,
    IonIcon
  },
  name: "add_student",
  setup() {
    defineRule("requiredItemCode", (value) => {
      if (!value || !value.length) {
        return "The items field is required";
      }
      return true;
    });
    defineRule("requiredStock", (value) => {
      if (!value || !value.length) {
        return "The quantity field is required";
      }
      return true;
    });
    defineRule("stock", (value) => {
      if (value<=0) {
        return "The quantity field can't be negative number";
      }
      return true;
    });

    function validation() {
      return theForm.validate();
    }

    const schema = {
      item_code: "requiredItemCode",
      available_stock: "requiredStock|stock",
    };

    const theForm = useForm({
      validationSchema: schema,
    });
    const {value: item_code, errorMessage: itemCodeError} = useField("item_code");
    const {value: available_stock, errorMessage: stockError} = useField("available_stock");

    const enterAnimation = (baseEl) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
          .addElement(root.querySelector('ion-backdrop'))
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
          .addElement(root.querySelector('.modal-wrapper'))
          .keyframes([
            {offset: 0, opacity: '0', transform: 'scale(0)'},
            {offset: 1, opacity: '0.99', transform: 'scale(1)'},
          ]);

      return createAnimation()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl) => {
      return enterAnimation(baseEl).direction('reverse');
    };
    return {
      enterAnimation, leaveAnimation, calendarOutline,
      item_code, itemCodeError, theForm, validation,
      available_stock, stockError, addCircleOutline,
    };
  },


  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      validateData:'',
      form: {
        item_code: '',
        available_stock: ''
      }
    }
  },
  methods: {
    dismiss() {
      this.is_open = !this.is_open
      this.$emit('closeModel')
    },
    async openAddStockModel() {
      await this.getAllItems()
      this.is_open = true
    },

    async getAllItems() {
      try {
        this.is_table_loading = true
        let respond = (await SupplierApis.getAll()).data.data.items
        this.item = respond.map((e, index) => ({
          value: e._id,
          label: e.name,
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },

    async saveData() {
      try {
        this.validateData = (await this.validation());
        if (this.validateData.valid) {
          this.is_btn_loading = true
          let payload = {
            available_stock : this.available_stock,
            item_code :this.item_code
          }
          await StockApis.createStock(payload)
          await this.successToast('Stock Added Successfully')
          this.dismiss()
        }
      } catch (e) {
        await this.dangerToast(e)
      }
      this.is_btn_loading = false
    },
  },
}
</script>

<style scoped>

</style>

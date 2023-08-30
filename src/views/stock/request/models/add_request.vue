<template>
  <ion-modal :enter-animation="enterAnimation" :is-open="is_open" :leave-animation="leaveAnimation">
    <ion-content fullscreen>
      <ion-toolbar class="toolbar" style="padding-top: 10px">
        <ion-title style="align-items: center;">CREATE REQUEST</ion-title>
        <ion-buttons slot="end">
          <ion-button style="--color: white;" @click="dismiss()">X Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-label position="floating">Item</ion-label>
            <ion-select v-model="supplier_id" class="u-input" name="supplier_id" placeholder="Select role" required>
              <ion-select-option v-for="i in item" :value="i.value">{{ i.label }}</ion-select-option>
            </ion-select>
            <ion-row v-show="supplierError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ supplierError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="6">
            <ion-label position="floating">*Due Date</ion-label>
            <ion-input class="u-input" name="due_date" v-model="due_date" clear-input required type="date" ></ion-input>
            <ion-row v-show="requiredDate" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ requiredDate }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="12">
            <ion-label position="floating">*Request</ion-label>
            <ion-textarea name="request" class="u-input" v-model="request" clear-input type="text" maxlength="1000" style="height:100px;" placeholder="e.g. Lorem Ipsum is simply dummy text of the printing and typesetting industry...." ></ion-textarea>
            <ion-row v-show="descriptionError" class="ion-text-start">
              <ion-col size="12">
                <ion-text color="danger">
                  <span>{{ descriptionError }}</span>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-button :disabled="is_btn_loading" class="mt-5" expand="block" shape="round" style="margin-top: 5%"
                    @click="createStock()">
          <ion-spinner :hidden="!is_btn_loading" name="circles"></ion-spinner>
          Add
        </ion-button>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script>
import staffApis from '@/apis/modules/admin_apis/staff_apis'
import StockAPIS from "@/apis/modules/stock_apis/stock_apis";
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
    defineRule("requiredUser", (value) => {
      if (!value || !value.length) {
        return "The supplier field is required";
      }
      return true;
    });
    defineRule("requiredDescription", (value) => {
      if (!value || !value.length) {
        return "The description field is required";
      }
      return true;
    });
    defineRule("requiredDate", (value) => {
      if (!value || !value.length) {
        return "The due date field is required";
      }
      return true;
    });
    function validation() {
      return theForm.validate();
    }
    const schema = {
      supplier_id: "requiredUser",
      request: "requiredDescription",
      due_date: "requiredDate",
    };
    const theForm = useForm({
      validationSchema: schema,
    });
    const {value: supplier_id, errorMessage: supplierError} = useField("supplier_id");
    const {value: request, errorMessage: descriptionError} = useField("request");
    const {value: due_date, errorMessage: requiredDate} = useField("due_date");

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
      supplier_id, supplierError, theForm, validation,
      request, descriptionError, addCircleOutline,
      due_date, requiredDate, arrowDownCircleOutline,
    };
  },

  data() {
    return {
      is_btn_loading: false,
      is_open: false,
      validateData:'',
      item: [],
      form: {
        supplier_id: '',
        request:'',
        due_date:''
      }
    }
  },
  methods: {
    dismiss() {
      this.is_open = !this.is_open
      this.$emit('closeModel')
    },
    async openAddRequestModel() {
     await this.getAllItems()
      this.is_open = true
    },
    async getAllItems() {
      try {
        this.is_table_loading = true
        let respond = (await staffApis.getAllStaff('supplier')).data.data.users
        console.log(respond)
        this.item = respond.map((e, index) => ({
          value: e._id,
          label: e.first_name
        }))
      } catch (e) {

      }
      this.is_table_loading = false
    },
    async createStock() {
      try {
        this.validateData = (await this.validation());
        if (this.validateData.valid) {
          this.is_btn_loading = true
            let payload = {
              supplier_id: this.supplier_id,
              due_date: this.due_date,
              request:this.request
            }
            await StockAPIS.makeRequest(payload)
            await this.successToast('Send Request')
            this.dismiss()
        }
      } catch (e) {
        // await this.successToast('This Stock is Already Exists')
      }
      this.is_btn_loading = false
    },


  },
}
</script>

<style scoped>

</style>

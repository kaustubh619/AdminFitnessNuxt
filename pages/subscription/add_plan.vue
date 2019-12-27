<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: center"
        >
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">
              Add Subscription Plan
            </h2>
            <input
              type="text"
              id="title"
              placeholder="Subscription Plan Title"
              class="form-style"
              v-model="title"
            />
            <input
              type="number"
              id="min_BMR_male"
              placeholder="Min BMR Male"
              class="form-style"
              v-model="min_bmr_male"
            />
            <input
              type="number"
              id="max_BMR_male"
              placeholder="Max BMR Male"
              class="form-style"
              v-model="max_bmr_male"
            />
            <input
              type="number"
              id="min_BMR_female"
              placeholder="Min BMR Female"
              class="form-style"
              v-model="min_bmr_female"
            />
            <input
              type="number"
              id="max_BMR_female"
              placeholder="Max BMR Female"
              class="form-style"
              v-model="max_bmr_female"
            />
            <input
              type="number"
              id="discount"
              placeholder="Discount on Nutrition Products"
              class="form-style"
              v-model="discount"
            />
            <input
              type="number"
              id="price"
              placeholder="Subscription Charges"
              class="form-style"
              v-model="price"
            />
            <label>Subscription Features</label>
            <div
              id="editorjs"
              style="border: 1px solid #b0b0b0; border-radius: 4px; background-color: #fff; padding: 20px; padding-left: 30px; margin-top: 10px; margin-bottom: 20px"
            ></div>

            <button
              type="button"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto; padding: 10px 30px;"
              @click="addSubscriptionPlan"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let EditorJS, List;

  if (process.browser) {
    EditorJS = require("@editorjs/editorjs");
    List = require("@editorjs/list");
  }

  export default {
    data() {
      return {
        title: "",
        min_bmr_male: "",
        max_bmr_male: "",
        min_bmr_female: "",
        max_bmr_female: "",
        discount: "",
        price: ""
      };
    },
    mounted() {
      this.editor = new EditorJS({
        holder: "editorjs",
        tools: {
          list: List
        }
      });
    },
    methods: {
      addSubscriptionPlan() {
        this.editor.save().then(async data => {
          var payload = new FormData();
          payload.append("title", this.title);
          payload.append("min_BMR_male", this.min_bmr_male);
          payload.append("max_BMR_male", this.max_bmr_male);
          payload.append("min_BMR_female", this.min_bmr_female);
          payload.append("max_BMR_female", this.max_bmr_female);
          payload.append("discount_on_products", this.discount);
          payload.append("cost", this.price);
          payload.append("plan_features", JSON.stringify(data.blocks));
          this.$store.dispatch("addSubscriptionPlan", payload).then(res => {
            this.$router.push("/subscription");
          });
        });
      }
    }
  };
</script>

<style>
.form-style {
  display: block;
  margin-bottom: 20px;
  width: 680px;
  padding: 8px 14px;
}

@media (max-width: 37.5em) {
  .form-style {
    width: 300px;
  }
}

@media (min-width: 37.5em) and (max-width: 75em) {
  .form-style {
    width: 500px;
  }
}

input,
textarea,
select {
  outline: none;
  border: 1px solid #b0b0b0;
  border-radius: 3px;
  color: #606060;
}
</style>
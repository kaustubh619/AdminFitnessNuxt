<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: center"
        >
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Brand</h2>

            <label for="brand_name">Brand Name</label>
            <input
              type="text"
              id="brand_name"
              class="form-style"
              v-model="brand_name"
            />

            <label for="category">Category</label>
            <select id="category" class="form-style"></select>

            <button
              @click="updateBrand"
              type="submit"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brand_name: ""
      };
    },

    computed: {},

    mounted() {
      this.getBrandDetail();
    },

    methods: {
      getBrandDetail: function() {
        this.$store
          .dispatch("getBrandDetail", this.$route.params.id)
          .then(res => {
            this.brand_name = res.data.name;
            this.category_id = res.data.category;

            this.$store.dispatch("getSubCategory").then(res => {
              this.allsubcategories = JSON.parse(JSON.stringify(res.data));

              var select = document.getElementById("category");

              const subcategoryObj = {};

              res.data.map(item => {
                subcategoryObj[item.id] = { name: item.name };
              });

              for (this.i in subcategoryObj) {
                select.options[select.options.length] = new Option(
                  subcategoryObj[this.i].name,
                  this.i
                );
              }

              $("#category").val(this.category_id);
            });
          });
      },

      updateBrand: function() {
        var payload = {
          id: this.$route.params.id,
          name: this.brand_name,
          category: $("#category").val()
        };
        this.$store.dispatch("updateBrand", payload).then(res => {
          console.log(res);
          console.log(payload.id);
        });
        this.$router.push("/dashboard/products/brands");
      }
    }
  };
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

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

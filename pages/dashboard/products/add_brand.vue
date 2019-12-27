<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: center"
        >
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Add Brand</h2>
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
              @click="addBrand"
              type="submit"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto"
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
  export default {
    data() {
      return {
        brand_name: ""
      };
    },

    computed: {},

    mounted() {
      this.selectMenu();
    },

    methods: {
      addBrand: function() {
        var payload = new FormData();
        payload.append("name", this.brand_name);
        payload.append("category", $("#category").val());

        this.$store.dispatch("addBrand", payload).then(res => {
          console.log(res.data);
        });

        this.$router.push("/dashboard/products/brands");
      },

      selectMenu: function() {
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

          $("#category").val("none");
        });
      }
    }
  };
</script>

</script>

<style scoped>
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
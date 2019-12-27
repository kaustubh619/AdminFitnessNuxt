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
              Sub-Category
            </h2>

            <label for="category_name">Sub-Category Name</label>
            <input
              type="text"
              id="category_name"
              class="form-style"
              v-model="subcategory_name"
            />

            <label for="category">Category</label>
            <select id="category" class="form-style"></select>

            <button
              @click="updateSubCategory"
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
      subcategory_name: ""
    };
  },

  computed: {},

  mounted() {
    this.getSubCategoryDetail();
  },

  methods: {
    getSubCategoryDetail: function() {
      this.$store
        .dispatch("getSubCategoryDetail", this.$route.params.id)
        .then(res => {
          this.subcategory_name = res.data.name;
          this.category_id = res.data.category;

          this.$store.dispatch("getCategory").then(res => {
            this.allcategories = JSON.parse(JSON.stringify(res.data));

            var select = document.getElementById("category");

            const categoryObj = {};

            res.data.map(item => {
              categoryObj[item.id] = { name: item.name };
            });

            for (this.i in categoryObj) {
              select.options[select.options.length] = new Option(
                categoryObj[this.i].name,
                this.i
              );
            }

            $("#category").val(this.category_id);
          });
        });
    },

    updateSubCategory: function() {
      var payload = {
        id: this.$route.params.id,
        name: this.subcategory_name,
        category: $("#category").val()
      };
      this.$store.dispatch("updateSubCategory", payload).then(res => {
        console.log(res);
      });
      this.$router.push("/dashboard/products/sub-category");
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

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
              Edit Category
            </h2>

            <label for="category_name">Category Name</label>
            <input
              type="text"
              id="category_name"
              class="form-style"
              v-model="category_name"
            />

            <button
              @click="updateCategory"
              type="submit"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto"
            >
              Update
            </button>
            <!-- @click="updateCategory"  -->
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
        category_name: ""
      };
    },

    computed: {},

    mounted() {
      this.getCategoryDetail();
    },

    methods: {
      getCategoryDetail: function() {
        this.$store
          .dispatch("getCategoryDetail", this.$route.params.id)
          .then(res => {
            this.category_name = res.data.name;
          });
      },
      updateCategory: function() {
        var payload = {
          id: this.$route.params.id,
          name: this.category_name
        };
        this.$store.dispatch("updateCategory", payload).then(res => {
          console.log(res);
        });

        this.$router.push("/dashboard/products/product_category");
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
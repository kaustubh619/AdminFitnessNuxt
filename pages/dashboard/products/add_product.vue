<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: center"
        >
          <form>
            <h2 style="margin-bottom: 20px; text-align: center">Add Product</h2>
            <label for="product_name">Product Name</label>
            <input
              type="text"
              id="product_name"
              class="form-style"
              v-model="product_name"
            />

            <label for="description">Description</label>
            <textarea
              rows="4"
              cols="51"
              id="description"
              class="form-style"
              v-model="description"
            ></textarea>

            <label for="price">Price</label>
            <input
              type="number"
              id="price"
              class="form-style"
              v-model="price"
            />

            <label for="discount">Discount %</label>
            <input
              type="number"
              id="discount"
              class="form-style"
              v-model="discount"
            />

            <!-- <label for="images">Images</label>
                <textarea rows="4" cols="51" id="images" class="form-style" v-model="images"></textarea> -->

            <div id="image-uploader" style="margin-bottom: 20px">
              <label for="images">Images</label>
              <span id="drag-drop-area"></span>
            </div>

            <label for="specifications">Specifications</label>
            <textarea
              rows="4"
              cols="51"
              id="specifications"
              class="form-style"
              v-model="specifications"
            ></textarea>

            <label for="bmr_min">Min BMR</label>
            <input
              type="number"
              id="bmr_min"
              class="form-style"
              v-model="bmr_min"
            />

            <label for="bmr_max">Max BMR</label>
            <input
              type="number"
              id="bmr_max"
              class="form-style"
              v-model="bmr_max"
            />

            <div style="display: block; margin-bottom: 20px; padding:8px 14px">
              <label style="margin-right: 10px">Status:</label>
              <input
                type="radio"
                name="status"
                value="0"
                style="margin-right:5px"
              />Offline
              <input
                type="radio"
                name="status"
                value="1"
                style="margin-right:5px; margin-left: 10px"
              />Active
              <input
                type="radio"
                name="status"
                value="2"
                style="margin-right:5px; margin-left: 10px"
              />Out Of Stock
            </div>

            <label for="category">Category</label>
            <select id="category" class="form-style"></select>

            <label for="subcategory">Sub-Category</label>
            <select id="subcategory" class="form-style"></select>

            <label for="brand">Brand</label>
            <select id="brand" class="form-style"></select>

            <button
              @click="addProduct"
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
}

a.uppy-Dashboard-poweredBy {
  display: none;
}
</style>

<script>
  export default {
    middleware: "auth",
    data() {
      return {
        product_name: "",
        description: "",
        price: "",
        discount: "",
        images: "",
        specifications: "",
        bmr_min: "",
        bmr_max: "",
        status: "",
        category: "",
        subcategory: "",
        brand: "",
        seller_id: ""
      };
    },

    computed: {},

    mounted() {
      this.selectMenu();
      var uppy = Uppy.Core()
        .use(Uppy.Dashboard, {
          inline: true,
          target: "#drag-drop-area",
          width: 680,
          height: 300
        })
        .use(Uppy.XHRUpload, { endpoint: "http://127.0.0.1:8000/product_image" });

      uppy.on("complete", result => {
        // console.log(
        //   "Upload complete! We’ve uploaded these files:",
        //   result.successful
        // );
        result.successful.map(item => {
          console.log(item);
        });
        this.images = JSON.stringify(result.successful);
      });
    },

    methods: {
      addProduct: function() {
        var payload = new FormData();
        payload.append("product_name", this.product_name);
        payload.append("description", this.description);
        payload.append("price", this.price);
        payload.append("discount", this.discount);
        payload.append("images", this.images);
        payload.append("specifications", this.specifications);
        payload.append("bmr_min", this.bmr_min);
        payload.append("bmr_max", this.bmr_max);
        payload.append("status", this.status);
        payload.append("category", $("#category").val());
        payload.append("subcategory", $("#subcategory").val());
        payload.append("brand", $("#brand").val());
        payload.append("seller_id", localStorage.getItem("user_id"));

        this.$store.dispatch("addProduct", payload).then(res => {
          console.log(res.data);
        });

        this.$router.push("/dashboard/products/product_list");
      },
      selectMenu: function() {
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

          $("#category").val("none");
        });

        this.$store.dispatch("getSubCategory").then(res => {
          this.allsubcategories = JSON.parse(JSON.stringify(res.data));

          var select = document.getElementById("subcategory");

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

          $("#subcategory").val("none");
        });

        this.$store.dispatch("getBrand").then(res => {
          this.allbrands = JSON.parse(JSON.stringify(res.data));

          var select = document.getElementById("brand");

          const brandObj = {};

          res.data.map(item => {
            brandObj[item.id] = { name: item.name };
          });

          for (this.i in brandObj) {
            select.options[select.options.length] = new Option(
              brandObj[this.i].name,
              this.i
            );
          }
          $("#brand").val("none");
        });
      }
    }
  };
</script>
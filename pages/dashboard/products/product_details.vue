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
              Product Details
            </h2>
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

            <label for="images">Images</label>
            <textarea
              rows="4"
              cols="51"
              id="images"
              class="form-style"
              v-model="images"
            ></textarea>
            <div id="image-uploader" style="margin-bottom: 20px">
              <label for="images">Upload Images</label>
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
              @click="updateProduct"
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
    middleware: "auth",
    data() {
      return {
        product_name: "",
        description: "",
        price: "",
        discount: "",
        images: [],
        specifications: "",
        bmr_min: "",
        bmr_max: "",
        category: "",
        subcategory: "",
        brand: "",
        allcategories: [],
        allsubcategories: []
      };
    },

    computed: {},

    mounted() {
      this.getProductDetail();
    },

    methods: {
      getProductDetail: function() {
        this.$store
          .dispatch("getProductDetail", this.$route.params.id)
          .then(res => {
            this.product_name = res.data.product_name;
            this.description = res.data.description;
            this.price = res.data.price;
            this.discount = res.data.discount;
            this.images = res.data.images;
            this.specifications = res.data.specifications;
            this.bmr_min = res.data.bmr_min;
            this.bmr_max = res.data.bmr_max;
            this.category = res.data.category.name;
            this.category_id = res.data.category.id;
            this.subcategory = res.data.subcategory.name;
            this.subcategory_id = res.data.subcategory.id;
            this.brand = res.data.brand.name;
            this.brand_id = res.data.brand.id;
            var uppy = Uppy.Core()
              .use(Uppy.Dashboard, {
                inline: true,
                target: "#drag-drop-area",
                width: 680,
                height: 300
              })
              .use(Uppy.XHRUpload, {
                endpoint: "http://127.0.0.1:8000/uppy_image"
              });

            uppy.on("complete", result => {
              // console.log(
              //   "Upload complete! We’ve uploaded these files:",
              //   result.successful
              // );
              this.images = [];
              result.successful.map(item => {
                // console.log(item.response.body.file.url);

                this.images.push(item.response.body.file.url);
              });
              // console.log(this.images);
            });

            if (res.data.status == "0") {
              $("input[value=0]").prop("checked", true);
            } else if (res.data.status == "1") {
              $("input[value=1]").prop("checked", true);
            } else {
              $("input[value=2]").prop("checked", true);
            }

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

              $("#subcategory").val(this.subcategory_id);
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

              $("#brand").val(this.brand_id);
            });
          });
      },

      updateProduct: function() {
        var payload = {
          id: this.$route.params.id,
          product_name: this.product_name,
          description: this.description,
          price: this.price,
          discount: this.discount,
          images: this.images,
          specifications: this.specifications,
          bmr_min: this.bmr_min,
          bmr_max: this.bmr_max,
          status: $("input[name='status']:checked").val(),
          category: $("#category").val(),
          subcategory: $("#subcategory").val(),
          brand: $("#brand").val()
        };
        this.$store.dispatch("updateProduct", payload).then(res => {
          // console.log(res);
        });
        this.$router.push("/dashboard/products/product_list");
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

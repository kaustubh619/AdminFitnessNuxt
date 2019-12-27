<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h3 style="display: flex;align-items: center;">
            Add a Product to your catalogue
          </h3>
          <p style="padding-left: 19px;padding-bottom: 10px;">
            Product added here will be added to a common database and vendors
            can use these as templates when adding their products
          </p>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col col s24 m8 l6">
              <label>Category</label>
              <select @change="getSubcategories" v-model="category_selected">
                <option v-for="p in category" :key="p.id" :value="p.id">{{
                  p.name
                }}</option>
              </select>
            </div>
            <div class="col s24 m8 l6">
              <label>SubCategory</label>
              <select
                @change="getsubCategoryDetails"
                v-model="subcategory_selected"
              >
                <option v-for="p in subcategory" :key="p.id" :value="p.id">{{
                  p.name
                }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="holder" v-show="subcategory_selected != undefined">
        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">Basic Details</h3>
          <p style="padding-left: 19px;padding-bottom: 10px;color:#E91E63">
            These informations cannot be changed by the Vendors
          </p>
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24 m16">
              <div class="form-group">
                <label for="exampleInputEmail1">Product ID</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="product_id"
                  aria-describedby="emailHelp"
                  placeholder="UPC, EAN, GCID, GTIN, ASIN"
                />
              </div>
            </div>
            <div class="col s24 m8">
              <div class="form-group">
                <label for="exampleInputEmail1">Product ID Type</label>
                <select v-model="product_id_type">
                  <option
                    v-for="p in product_id_list"
                    :key="p.id"
                    :value="p.id"
                    >{{ p.name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Product Name</label>
                <input
                  type="text"
                  @input="slugifyTitle"
                  v-model="product_name"
                  class="form-control"
                  placeholder="Redmi 7A ( 32GB , 2 GB ) Black"
                />
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <div
                  style="display: flex;justify-content: space-between;align-items: center;"
                >
                  <label style="display:flex" for="exampleInputEmail1"
                    >Product Slug</label
                  >
                  <div
                    v-if="!editSlug"
                    @click="allowSlugField(1)"
                    class="link_tag"
                  >
                    Edit
                  </div>
                  <div
                    v-if="editSlug"
                    @click="allowSlugField(0)"
                    class="link_tag"
                  >
                    Save
                  </div>
                </div>
                <input
                  v-model="slugify"
                  :disabled="editSlug == 0"
                  class="form-control"
                  placeholder="redmi-7a-32gb-2-gb-black"
                />
              </div>
            </div>
            <div class="col s24 m12">
              <div class="form-group">
                <label for="exampleInputEmail1">Brand</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="brand"
                  placeholder="Xiaomi"
                />
              </div>
            </div>
            <div class="col s24 m12">
              <div class="form-group">
                <label for="exampleInputEmail1">Manufacturer</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="manufacturer"
                  placeholder="Xiaomi"
                />
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Search Terms (SEO)</label>
                <input
                  type="text"
                  v-model="seo"
                  class="form-control"
                  placeholder="Terms that will describe this product"
                />
              </div>
            </div>
          </div>
        </div>

        <hr class="break" />

        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">
            Descriptions & Bullet Points
          </h3>
          <p style="padding-left: 19px;padding-bottom: 10px;color:#E91E63">
            These informations cannot be changed by the Vendors
          </p>
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1"
                  >Write a Short Description about the product</label
                >
                <textarea v-model="desc" style="height:160px"></textarea>
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1"
                  >Add Bullet Points (Upto 9)</label
                >
                <div
                  style="display: flex; align-items:center"
                  v-for="(p, index) in bullet_points"
                  :key="p.length"
                >
                  <input type="text" class="form-control" v-model="p.value" />
                  <div
                    style="color: red"
                    class="pointer"
                    @click="removeBullets(index)"
                  >
                    Remove
                  </div>
                </div>
                <div class="link_tag" @click="addMoreBullets">
                  + Add More points
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <hr class="break">


        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">Stock Management</h3>
          <p style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
          >These informations cannot be changed by the Vendors</p>
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Write a Short Description about the product</label>
                <textarea style="height:160px"></textarea>
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Add Bullet Points (Upto 9)</label>
                <div style="display: flex; align-items:center" v-for="(p, index) in bullet_points" :key="p.length">
                  <input
                  type="text"
                  class="form-control"
                  v-model="p.value"
                />
                <div style="color: red" class="pointer" @click="removeBullets(index)">Remove</div>
                </div>
                <div class="link_tag" @click="addMoreBullets">Add More points</div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <div class="holder" v-show="subcategory_selected != undefined">
        <h3 class>Images</h3>
        <p style="padding-left: 19px;padding-bottom: 10px;">
          Upload Images. (Max 10)
        </p>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <div class="dropzone dz-clickable" id="myDrop">
            <div class="dz-default dz-message" data-dz-message>
              <span>Drop files here to upload</span>
            </div>
          </div>
        </div>
      </div>
      <div class="holder" v-if="subcategory_selected != undefined">
        <h3>Specifications</h3>
        <div v-if="specs == ''">
          <p style="padding-left: 19px;padding-bottom: 10px;">
            Specifications not added. Go to
            <nuxt-link
              :to="
                '/dashboard/templates/specification/' +
                  this.subcategory_selected
              "
              >Specifications
            </nuxt-link>
            and add them
          </p>
        </div>
        <div v-if="specs != ''">
          <p style="padding-left: 19px;padding-bottom: 10px;">
            You can edit
            <nuxt-link
              :to="
                '/dashboard/templates/specification/' +
                  this.subcategory_selected
              "
              >Specifications</nuxt-link
            >
            here
          </p>
        </div>
        <!-- <p>Please Complete the specification section</p> -->
        <div v-if="specs != ''">
          <div
            v-for="(p, index) in specs"
            :key="p.id"
            class="input_fields_wrap drag-list"
            id="h"
          >
            <h3>{{ p.name }}</h3>
            <div class="row">
              <div class="col s12">
                <div
                  class="col s24"
                  v-for="(q, index1) in p['sub']"
                  :key="q.id"
                >
                  <div class="form-group">
                    <label>{{ q.name }}</label>

                    <div v-if="q.type == 1">
                      <input type="text" />
                    </div>

                    <div style="display: flex;" v-if="q.type == 2">
                      <select
                        v-model="q.value"
                        style="display: inline-block; width: 100% "
                      >
                        >
                        <option
                          v-for="r in q.dropdown_items"
                          :key="r.id"
                          :value="r.name"
                          >{{ r.name }}</option
                        >
                      </select>
                    </div>

                    <div style="display: flex;" v-if="q.type == 3">
                      <input type="text" v-model="q.value" />
                      <select
                        v-model="q.dropdown"
                        style="display: inline-block; width: 30% "
                      >
                        >
                        <option
                          v-for="r in q.dropdown_items"
                          :key="r.id"
                          :value="r.name"
                          >{{ r.name }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="holder" v-if="slugify != ''">
        <h3 class>Submit Product</h3>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <button class="btn" @click="addProduct">Add Product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {
      category: [],
      images: [],
      category_selected: 0,
      subcategory: [],
      editSlug: 0,
      product_name: "",
      subcategory_selected: undefined,
      brand: [],
      product_id: "",
      product_id_type: "",
      slugify: "",
      brand: "",
      manufacturer: "",
      seo: "",
      desc: "",
      bullet_points: [],
      product_id_list: [
        {
          id: 1,
          name: "UPC"
        },
        {
          id: 2,
          name: "EAN"
        },
        {
          id: 3,
          name: "GCID"
        },
        {
          id: 4,
          name: "GTIN"
        },
        {
          id: 5,
          name: "ASIN"
        }
      ],
      product_id_type: 1,
      specs: [],
      brand_selected: 0,
      columns: [
        {
          label: "Category",
          field: "name"
        },
        {
          label: "Age",
          field: "age",
          type: "number"
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM Do yy"
        },
        {
          label: "Action",
          field: "details"
        }
      ],
      rows: [
        {
          id: 1,
          name: "Mobile",
          age: 20,
          createdAt: "2011-10-31",
          details: "<p>asa</p>"
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getCategory").then(res => {
      console.log(res);
      this.category = res.data;
    });

    var vm = this;
    Dropzone.autoDiscover = false;
    this.myDropzone = new Dropzone("div#myDrop", {
      paramName: "file", // The name that will be used to transfer the file
      addRemoveLinks: true,
      uploadMultiple: true,
      autoProcessQueue: true,
      parallelUploads: 10,
      maxFiles: 10,
      maxFilesize: 5, // MB
      acceptedFiles: ".png, .jpeg, .jpg",
      url: vm.$store.state.api.imageUpload,
      headers: {
        Authorization: "Bearer " + vm.$cookies.get("access_token"),
        "Cache-Control": null,
        "X-Requested-With": null
      }
    });
    this.myDropzone.on("sending", function(file, xhr, formData) {
      var filenames = [];
      console.log("success");
      $(".dz-preview .dz-filename").each(function() {
        filenames.push(
          $(this)
            .find("span")
            .text()
        );
      });
      formData.append("filenames", filenames);
    });
    /* Add Files Script*/
    this.myDropzone.on("success", function(file, message) {
      console.log("success");
      console.log(message);
      vm.images.push(message.filename);
    });
    this.myDropzone.on("error", function(data) {
      $("#msg").html(
        '<div class="alert alert-danger">There is some thing wrong, Please try again!</div>'
      );
    });
    this.myDropzone.on("complete", function(file) {
      //   myDropzone.removeFile(file)
    });
    this.myDropzone.on("removedfile", function(file) {
      //   myDropzone.removeFile(file)
      console.log(file);
      vm.images = vm.images.filter(v => v != "static/products/" + file.name);
    });
    this.myDropzone.on("addedfile", function(file) {
      console.log("added file");
    });
    $("#add_file").on("click", function() {
      console.log("success");
      this.myDropzone.processQueue();
    });
  },
  methods: {
    getSubcategories: function() {
      this.$store
        .dispatch("getsubCategory", this.category_selected)
        .then(res => {
          console.log(res);
          console.log("________________");
          this.subcategory_selected = 0;
          console.log(this.subcategory_selected);
          this.subcategory = res.data;
        });
    },
    addProduct: function() {
      var payload = new FormData();
      payload.append("product_name", this.product_name);
      payload.append("product_id", this.product_id);
      payload.append("product_id_type", this.product_id_type);
      payload.append("slug", this.slugify);
      payload.append("description", this.desc);
      payload.append("images", JSON.stringify(this.images));
      payload.append("category", this.category_selected);
      payload.append("subcategory", this.subcategory_selected);
      payload.append("brand", this.brand);
      payload.append("manufacturer", this.manufacturer);
      payload.append("seo", this.seo);
      payload.append("bullet_points", JSON.stringify(this.bullet_points));
      payload.append("specs", JSON.stringify(this.specs));

      this.$store.dispatch("addProduct", payload).then(res => {
        console.log(res);
        this.$router.push("/dashboard/products/all");
      });
    },
    getsubCategoryDetails: function() {
      if (this.subcategory_selected != undefined) {
        this.$store
          .dispatch("getsubCategoryDetails", this.subcategory_selected)
          .then(res => {
            console.log(res);
            console.log("response");
            this.specs = [];
            if (res.data.specs.length != 0) {
              this.specs = JSON.parse(res.data.specs);
            }
          })
          .catch(err => {
            console.log("error in request", err);
          });
      }
    },
    addMoreBullets: function() {
      if (this.bullet_points.length < 9) {
        this.bullet_points.push({ value: "" });
      }
    },
    removeBullets: function(index) {
      this.bullet_points.splice(index, 1);
    },
    slugifyTitle: function() {
      this.slugify = this.product_name
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    },
    allowSlugField: function(val) {
      console.log(val);

      this.editSlug = val;
    }
  }
};
</script>

<style>
select,
input,
textarea {
  height: 35px;
  font-family: "Regular";
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  transition: all 0.3s;
}

h3 {
  font-size: 20px;
  padding-left: 19px;
  padding-bottom: 10px;
}

h4 {
  font-size: 25px;

  padding-left: 19px;
  padding-bottom: 10px;
}

.holder {
  margin-bottom: 20px;
}

label {
  font-size: 15px;
  font-weight: 500;
  line-height: 30px;
  font-family: "Bold";
}

/* .form-group{
  display: flex;
    justify-content: space-between;
    align-items: baseline;
} */

.form-group {
  display: flex;
  flex-direction: column;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #afafaf;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #afafaf;
}

::placeholder {
  color: #afafaf;
}

.link_tag {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>

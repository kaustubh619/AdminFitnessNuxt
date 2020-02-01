<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: center"
        >
          <!-- <form> -->
          <div>
            <h2 style="margin-bottom: 20px; text-align: center">
              Gallery Images
            </h2>

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

            <button
              @click="updateGallery"
              type="submit"
              class="btn btn-primary"
              style="background-color:rgb(76, 175, 80); color: white; display: block; margin-left:auto; margin-right:auto"
            >
              Update
            </button>
          </div>
          <!-- </form> -->
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
        images: [],
        gallery_id: ""
      };
    },

    computed: {},

    mounted() {
      this.getGalleryImages();
    },

    methods: {
      getGalleryImages: function() {
        this.$store.dispatch("getGalleryImages").then(res => {
          this.images = JSON.stringify(res.data[0].gallery_images);
          this.gallery_id = res.data[0].id;
          var uppy = Uppy.Core()
            .use(Uppy.Dashboard, {
              inline: true,
              target: "#drag-drop-area",
              width: 680,
              height: 300
            })
            .use(Uppy.XHRUpload, {
              endpoint: "http://www.mytruestrength.com/backend/uppy_image"
            });
          uppy.getFile();
          uppy.on("complete", result => {
            this.images = [];

            result.successful.map(item => {
              this.images.push(item.response.body.file.url);
            });
          });
        });
      },

      updateGallery: function() {
        var payload = new FormData();
        payload.append("id", this.gallery_id);
        payload.append("gallery_images", this.images);
        this.$store.dispatch("updateGallery", payload).then(res => {
          alert("Gallery updated");
        });
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

import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const state = () => ({
  getCategory: [],
  getAllProducts: [],
  getAllOrder: [],
  getAllAuction: [],
  getAllCompletedAuction: [],
  getAllOngoingAuction: [],
  singleProduct: []
});

export const mutations = {
  getCategory(state, getCategory) {
    console.log("selecting exercise mutation, " + getCategory);
    state.getCategory = getCategory;
  },
  getAllProducts(state, getAllProducts) {
    state.getAllProducts = getAllProducts;
  },
  getAllOrder(state, getAllOrder) {
    console.log("selecting exercise mutation, " + getAllOrder);
    state.getAllOrder = getAllOrder;
  },
  getAllAuction(state, getAllAuction) {
    console.log("selecting exercise mutation, " + getAllAuction);
    state.getAllAuction = getAllAuction;
  },
  getAllCompletedAuction(state, getAllCompletedAuction) {
    console.log("selecting exercise mutation, " + getAllCompletedAuction);
    state.getAllCompletedAuction = getAllCompletedAuction;
  },
  getAllOngoingAuction(state, getAllOngoingAuction) {
    console.log("selecting exercise mutation, " + getAllOngoingAuction);
    state.getAllOngoingAuction = getAllOngoingAuction;
  },
  singleProduct(state, singleProduct) {
    console.log("selecting exercise mutation, " + singleProduct);
    state.singleProduct = singleProduct;
  }
};

export const getters = {
  get_selectedUserMessage(state) {
    return state.selectedUserMessage;
  }
};

export const actions = {
  allProducts({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.allProducts,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          commit("getAllProducts", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteAdmin({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteAdmin + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteTrainer({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteTrainer + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteSubCategory({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteSubCategory + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("access_token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteBrand({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteBrand + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("access_token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  allProductsRequests({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.allProductsRequests,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("access_token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  changeProductStatus({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      var bodyFormData = new FormData();

      bodyFormData.append("status", payload.status);

      axios({
        method: "PUT",
        data: bodyFormData,
        url: state.api.changeProductStatus + payload.id,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + this.$cookies.get("access_token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getAllSeller({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getAdmin,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getAllTrainer({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getAllTrainer,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getAllCust({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getAllCust,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  addTrainer({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addTrainer,
        contentType: "application/json"
      })
        .then(res => {
          console.log(res);
          // commit('getSingleAuction', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  addTrainerExt({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addTrainerExt,
        contentType: "application/json"
      })
        .then(res => {
          // console.log(res)
          resolve(res);
        })
        .catch(err => {
          console.log("error in ext", err);
        });
    });
  },

  getUserDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getUserDetail + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getUserExtDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getUserExtDetail + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  updateUser({ commit, state }, payload) {
    var bodyFormData = new FormData();

    bodyFormData.append("id", payload.id);

    bodyFormData.append("username", payload.username);

    bodyFormData.append("first_name", payload.first_name);

    bodyFormData.append("email", payload.email);

    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.updateUser + payload.id,
        contentType: "application/json",
        data: bodyFormData,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          commit("getCategory", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  updateUserExt({ commit, state }, payload) {
    var bodyFormData = new FormData();

    bodyFormData.append("user", payload.id);

    bodyFormData.append("location", payload.location);

    bodyFormData.append("gender", payload.gender);

    bodyFormData.append("user_type", "2");

    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.updateUserExt + payload.id,
        contentType: "application/json",
        data: bodyFormData,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          commit("getCategory", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getProductDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getProductDetail + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getCategory({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getCategory,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getSubCategory({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getSubCategory,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getBrand({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getBrand,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  updateProduct({ commit, state }, payload) {
    var bodyFormData = new FormData();

    bodyFormData.append("id", payload.id);

    bodyFormData.append("product_name", payload.product_name);

    bodyFormData.append("description", payload.description);

    bodyFormData.append("price", payload.price);

    bodyFormData.append("discount", payload.discount);

    bodyFormData.append("images", payload.images);

    bodyFormData.append("specifications", payload.specifications);

    bodyFormData.append("bmr_min", payload.bmr_min);

    bodyFormData.append("bmr_max", payload.bmr_max);

    bodyFormData.append("status", payload.status);

    bodyFormData.append("category", payload.category);

    bodyFormData.append("subcategory", payload.subcategory);

    bodyFormData.append("brand", payload.brand);

    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.updateProduct + payload.id + "/",
        contentType: "application/json",
        data: bodyFormData,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          commit("getCategory", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteProduct({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteProduct + payload + "/",
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  addProduct({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addProduct,
        contentType: "application/json"
      })
        .then(res => {
          // console.log(res)
          // commit('getSingleAuction', res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  allCategories({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.allCategories,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // commit(res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getCategoryDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.allCategories + "/" + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  allSubCategories({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.allSubCategories,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // commit(res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getSubCategoryDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.subCategoryIdDetail + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
          // console.log(res)
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  allBrands({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.allBrands,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // commit(res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteCategory({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteCategory + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteSubCategory({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteSubCategory + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  deleteBrand({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.deleteBrand + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          // console.log(res.data)
          // console.log('response')
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  updateCategory({ commit, state }, payload) {
    var bodyFormData = new FormData();

    bodyFormData.append("id", payload.id);

    bodyFormData.append("name", payload.name);

    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.updateCategory + payload.id,
        contentType: "application/json",
        data: bodyFormData,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          commit("getCategory", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  addCategory({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addCategory,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  updateSubCategory({ commit, state }, payload) {
    var bodyFormData = new FormData();

    bodyFormData.append("id", payload.id);

    bodyFormData.append("name", payload.name);

    bodyFormData.append("category", payload.category);

    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.updateSubCategory + payload.id + "/",
        contentType: "application/json",
        data: bodyFormData,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          commit("getCategory", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  addSubCategory({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addSubCategory,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getBrandDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getBrandDetail + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
          // console.log(res)
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  updateBrand({ commit, state }, payload) {
    var bodyFormData = new FormData();

    bodyFormData.append("id", payload.id);

    bodyFormData.append("name", payload.name);

    bodyFormData.append("category", payload.category);

    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.getBrandDetail + payload.id + "/",
        contentType: "application/json",
        data: bodyFormData,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          commit("getCategory", res.data);
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
          console.log(payload.id);
        });
    });
  },

  addBrand({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addBrand,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getPlans({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getPlans,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  addSubscriptionPlan({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.getPlans,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  getPlanDetails({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getPlanDetails + payload.get("id"),
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  updatePlans({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.getPlanDetails + payload.get("id"),
        contentType: "application/json",
        data: payload,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  getGalleryImages({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getGalleryImages,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  updateGallery({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        url: state.api.updateGallery + payload.get("id"),
        contentType: "application/json",
        data: payload,
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  generateCoupon({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.generateCoupon,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  getUserCoupon({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getUserCoupon + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  editCoupon({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        data: payload,
        url: state.api.getUserCoupon + payload.get("id"),
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  getTrainersList({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.getTrainersList,
        contentType: "application/json"
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  addTrainer({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        data: payload,
        url: state.api.addTrainer,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  deleteTrainerBio({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "DELETE",
        data: payload,
        url: state.api.updateTrainerBio + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data);
          console.log("response");
          resolve(res);
        })
        .catch(err => {
          console.log("error in request", err);
        });
    });
  },

  getTrainerDetails({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: state.api.updateTrainerBio + payload,
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  },

  updateTrainerBio({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "PUT",
        data: payload,
        url: state.api.updateTrainerBio + payload.get("slug_id"),
        contentType: "application/json",
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log("Error In HTTP Request - ", err);
        });
    });
  }
};

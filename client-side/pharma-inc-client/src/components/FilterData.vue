<template>
  <div class="search-container">
    <img :src="searchIcon" />
    <b-form-input @input="searchField()" v-model="filterText" placeholder="Pesquisar" />
  </div>
</template>

<script>
import searchIcon from "@/assets/icons/magnify.svg";

export default {
  data() {
    return {
      searchIcon,
      filterText: ""
    };
  },
  methods:{
    searchField(){
      this.$emit('onFilterTextChanged', this.filterText)
    }
  }
};
</script>

<style lang="scss" scoped>
  .search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .form-control[type="text"] {
      height: 30px;
      width: 200px;
      &:focus {
        box-shadow: none;
        border-color: #ced4da !important;
      }
    }
  }
</style>